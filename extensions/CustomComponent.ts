// src/extensions/CustomComponent.ts
import { Node, mergeAttributes } from '@tiptap/core'

export const CustomComponent = Node.create({
  name: 'customComponent',

  group: 'block',

  // We consider this node as an atomic unit
  atom: true,

  // Allow inline content inside the custom block if needed
  content: 'inline*',

  // Define how the node should be parsed from HTML
  parseHTML() {
    return [
      {
        tag: 'div[data-type="custom-component"]',
      },
    ]
  },

  // Define the HTML rendering of the node
  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'custom-component',
        style:
          'border: 1px solid #007bff; padding: 5px; border-radius: 4px; background: #e7f3ff;',
      }),
      0, // 0 means render the node's content here if any
    ]
  },

  addCommands() {
    return {
      // Command to insert a custom component
      insertCustomComponent:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            // You can define default inner content if needed
            content: [{ type: 'text', text: 'This is a custom component' }],
          })
        },
    }
  },
})
