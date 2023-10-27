/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
const { OpenAI } = require("openai");
const openai = new OpenAI(process.env.OPENAI_API_KEY);

const guessOutput = async (input) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `${input} tell me the output of the following code along with th explaination of the code`,
      },
    ],
  });
  console.log(response.data);
  return response.choices[0].message.content;
};

module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");

  app.on("issues.opened", async (context) => {
    app.log.info("Yay, the app was loaded!");
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    return context.octokit.issues.createComment(issueComment);
  });

  app.on("pull_request", async (context) => {
    const { title, number, user } = context.payload.pull_request;

    // Log the title of the newly opened pull request
    app.log.info(`Pull request #${number} opened with title: ${title}`);

    // Comment on the pull request to indicate it will be merged soon
    const commentBody = `Thanks for opening this pull request, @${user.login}! :tada: This looks great! It will be merged soon. :rocket:`;

    // Create a comment on the pull request
    await context.octokit.issues.createComment({
      owner: context.repo().owner,
      repo: context.repo().repo,
      issue_number: number,
      body: commentBody,
    });
  });

  app.on("pull_request_review", async (context) => {
    const { payload } = context;

    // Check if the review is on a pull request
    if (payload.pull_request) {
      const prNumber = payload.pull_request.number;

      // Fetch the comments made during the review, sorted by creation time in descending order
      const reviewComments = await context.octokit.pulls.listReviewComments({
        owner: context.repo().owner,
        repo: context.repo().repo,
        pull_number: prNumber,
        sort: "created",
        direction: "desc",
      });

      // Get the latest comment (if any)
      const latestComment = reviewComments.data[0];

      if (latestComment) {
        console.log(latestComment);
        const aiOutput = await guessOutput(latestComment.diff_hunk);
        const updatedCommentBody = `${latestComment.body}\n\n ${aiOutput}`;

        // Edit the last comment with the updated body
        await context.octokit.pulls.updateReviewComment({
          owner: context.repo().owner,
          repo: context.repo().repo,
          comment_id: latestComment.id,
          body: updatedCommentBody,
        });

        console.log(
          `Replied to the last comment on PR #${prNumber}: ${updatedCommentBody}`
        );
      } else {
        console.log(`No comments on PR #${prNumber}`);
      }
    }
  });
};
