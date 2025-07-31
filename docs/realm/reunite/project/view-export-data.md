# View and export feedback data

Feedback form data is saved by project on the **Feedback** page.
The **Feedback** page includes two tabs one for **Page feedback** and one for **Code reports**.
You can search feedback data using words from page paths or from messages.

## View page feedback data

On the **Page feedback** tab is a table with the data collected from the feedback forms including the following data:

- **Page**: The file path to the page where the data was collected.
- **User**: The email address of the user who submitted the feedback form, if the user was logged in at the time.
- **Value**: The feedback submitted depending on the feedback form.
- **Message**: The message submitted, if a comment box was included.
- **Date**: The day the feedback form was submitted relative to the current date.
- **Status**: The status of the feedback, which can be **New**, **Archived** or **Spam**.

More feedback metadata is collected and can be viewed by clicking on the feedback item on the table.

To view detailed feedback data:

1. Select an item on the table, to view further information, including the following:
   - A clickable HTTPS link to the **Page** where the feedback form was submitted.
   - The **Location**, or the language-specific highlighted code snippet where the issue was reported.
   - **Show additional metadata** in JSON format including the platform and user agent information.
   - The reasons the user selected after the initial feedback form was submitted.
1. Select the share icon on the top right-hand side of the page, to save the link to the feedback report entry to your clipboard.
1. Select the expand icon in the top right-hand side of the page, to expand the feedback information to the width of the page.

## View code reports data

On the **Code reports** tab is a table with the data collected from the [code snippet report option's feedback form](../../setup/concepts/feedback.md#report-icon) including the following data:

- **Page**: The file path to the page where the data was collected.
- **User**: The email address of the user who submitted the feedback form, if the user was logged in at the time. Otherwise, user is Anonymous.
- **Message**: The message submitted, if a comment box was included.
- **Date**: The day the feedback form was submitted relative to the current date.
- **Status**: The status of the feedback, which can be **New**, **Archived** or **Spam**.

More feedback metadata is collected and can be viewed by clicking on the feedback item on the table.

To view detailed feedback data:

1. Select an item on the table, to view further information, including the following additional data:
   - A clickable HTTPS link to the **Page** where the feedback form was submitted.
   - The **Location**, or the language-specific highlighted code snippet where the issue was reported.
   - **Show additional metadata** in JSON format including the platform and user agent information.
1. Select the share icon on the top right-hand side of the page, to save the link to the feedback report entry to your clipboard.
1. Select the expand icon in the top right-hand side of the page, to expand the feedback information to the width of the page.

## Export feedback data

You can download a CSV of the feedback data by date range to share with others.

To export a CSV of feedback data:

1. Select **Export**.
1. Select the **Start date**.
1. Select the **End date**.
1. Select **OK**.

## Organize feedback

All feedback form data's initial status is set to **New**.
You can update each feedback entry's status to either **Archived** or **Spam** by clicking the current status and selecting the new status.
Afterward, when you select the status checkbox at the top of the table, the list is limited to the feedback data with the selected status.

## Resources

- Learn how to customize how the feedback form displays in your documentation in [Configure and view feedback](../../setup/how-to/feedback/index.md).
- Add additional options after users complete their initial feedback selection by following the steps in [Extend the feedback form](../../setup/how-to/feedback/extend-feedback.md).
- Learn more about the different feedback forms available in the [Feedback concept](../../setup/concepts/feedback.md).
- See different configuration options and examples in the [Feedback reference](../../config/feedback.md).
- Discover the different ways you can customize code samples in your documentation in the [CodeSnippet reference](../../config/code-snippet.md).
