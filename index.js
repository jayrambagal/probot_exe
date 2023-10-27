/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
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
};
