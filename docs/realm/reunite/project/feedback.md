# View and export feedback data

Feedback form data is saved by project on the **Feedback** page.
The **Feedback** page includes two tabs: one for **Page feedback** and one for **Code reports**.
You can search feedback data using words from page paths or from messages.

## Page feedback data

The **Page feedback** tab contains a table with the data collected from the feedback forms:

- **Page**: The file path to the page where the data was collected.
- **User**: The email address of the user who submitted the feedback form, if the user was logged in at the time.
- **Value**: The feedback submitted depending on the feedback form.
- **Message**: The message submitted, if a comment box was included.
- **Date**: The day the feedback form was submitted relative to the current date.
- **Status**: The status of the feedback, either: **New**, **In Review**, **Resolved**, **Archived** or **Spam**.

### View detailed feedback for pages

- Select an item in the table, to view detailed feedback information, including the following additional data:
  - A clickable HTTPS link to the **Page** where the feedback form was submitted.
  - The **Location**, or the language-specific highlighted code snippet where the issue was reported.
  - Input to add/update an **Internal comment**.
  - **Additional metadata** in JSON format including the platform and user agent information.
  - The reasons the user selected after the initial feedback form was submitted.

## Code reports data

The **Code reports** tab contains a table with the data collected from the [code snippet report option's feedback form](../../config/feedback.md#extend-feedback-forms):

- **Page**: The file path to the page where the data was collected.
- **User**: The email address of the user who submitted the feedback form, if the user was logged in at the time.
  Otherwise, user is Anonymous.
- **Message**: The message submitted, if a comment box was included.
- **Date**: The day the feedback form was submitted relative to the current date.
- **Status**: The status of the feedback, which can be **New**, **In Review**, **Resolved**, **Archived** or **Spam**.

### View detailed code reports

- Select an item on the table, to view detailed code reports information, including the following additional data:
  - A clickable HTTPS link to the **Page** where the feedback form was submitted.
  - The **Location**, or the language-specific highlighted code snippet where the issue was reported.
  - Input to add or update an **Internal comment**.
  - **Additional metadata** in JSON format including the platform and user agent information.

## Organize feedback

All feedback form data's initial status is set to **New**.
You can update each feedback entry's status to:
- **In Review**
- **Resolved**
- **Archived**
- **Spam**

You can also filter feedback entries by their status and by date when they were submitted.

### Copy link to feedback entry

To copy the link to a single feedback entry:

- In the chosen entry row, on the right-hand side of the feedback item, click the share icon.

The link to the feedback entry is copied to your clipboard.

### Update feedback status

To update the status:

- Click the chosen entry's status and from the drop-down list, select a new status.

### Filter feedback by status

To filter feedback entries by status:

- Select one or more status checkboxes.

The feedback table is limited to the entries with the selected statuses.

### Filter feedback by date

To filter feedback by creation date:

1. Above the table, click the date picker.
2. Select a period for which you want to display feedback entries:
    - Click the date on the left and select a start date from the calendar, then select an end date.
    - Click one of the available periods.

The table now displays entries for the selected period.

## Export feedback data

You can download a CSV of the feedback data by date range to share with others.

To export a CSV of feedback data:

1. In the top-right corner of the page, click **Export**.
1. Select a period for which you want to export feedback:
    - Click the date on the left and select a start date from the calendar, then select an end date.
    - Click one of the available periods.
1. Click **OK**.

The file is saved to your device.

## Resources

- **[Feedback configuration reference](../../config/feedback.md)** - Configure and customize feedback forms with various collection methods and styling options
- **[CodeSnippet configuration reference](../../config/code-snippet.md)** - Customize code snippet report buttons and feedback collection for technical documentation
