/**
 * Simple helper component to render a group of nodes without any surrounding
 * DOM markup.
 * No longer needed for React 16.2+, but for whatever reason, create-react-app's
 * current build system isn't happy with it. No big deal but at some point I
 * should replace this with fragment syntax.
 */
// @flow
export default ({ children }: { children: any }) => children;
