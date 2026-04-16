/** @type {import('@redocly/portal/types').McpToolHandler} */
const contactSupport = async (args, context, extra) => {
  return {
    content: [
      {
        type: 'text',
        message: 'Showing the contact support form to the user.',
      },
    ],
  };
};

export default { 'contact-support': contactSupport };
