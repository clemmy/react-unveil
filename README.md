# react-unveil

[![MIT License](https://img.shields.io/badge/license-mit-brightgreen.svg)](LICENSE)

> Lightweight and customizable React component that helps save real estate by limiting content height, with the option to expand and hide the content.

## Detail

In the JS ecosystem, there exists libraries like [react-truncate](https://github.com/One-com/react-truncate), [react-show-more](https://github.com/tedconf/react-show-more), and even [ellipsis.js](https://github.com/glinford/ellipsis.js) to handle showing more content. However, these solutions are tailored towards text-specific use cases.

The aim of this library is to support expanding and collapsing rich HTML. It does this using a double-rendering technique where the content is first rendered off-screen and measured, in order to decide the correct render behaviour. This means that there will be a slight performance overhead from rendering twice, but for most applications, this shouldn't be a huge problem. I'm happy to take PR's for better solutions.

## Demo

![react-unveil demo](https://raw.githubusercontent.com/clemmy/react-unveil/master/unveil.gif)

## Installation

```sh
npm install --save react-unveil
```

## Usage

```js
import Unveil from 'react-unveil';

class Demo {
  render() {
    return (
      <Unveil
        maxHeight={300}
        render={notifyResize => (
          <RichContent notifyResize={notifyResize} withImage />
        )}
      />
    );
  }
}
```

## Props

### `className`

`string`

This adds the given `className` to Unveil's root container.

### `style`

`object`

This merges the given `style` with Unveil's root container styles.

### `maxHeight`

`number`

This is the maximum height, in pixels, that is shown by the Unveil component in its collapsed state. Content surpassing `maxHeight` will be truncated.

### `render`

`function`

This is a render prop for the content you want to render. It receives an argument, `notifyResize`, so a render prop would be a function of the form: `notifyResize => <YourContent />;`.

#### `notifyResize`

`notifyResize` is a function passed to the render prop that should be called when the content resizes, such as in the completion callbacks of async components and images:

```jsx
<Unveil
  render={notifyResize => (
    <button
      src="https://placeimg.com/720/240/tech"
      onLoad={() => notifyResize()}
    />
  )}
/>
```

### `more`

`function`

This is a render prop for the ShowMore button to render. It receives an argument, `expand`. For optimal use with the library, the styles `bottom: 0` and `position: absolute` should be used.

#### `expand`

`expand` is a function passed to the render prop that should be called when the button is clicked in order to expand the Unveil:

```jsx
<Unveil
  render={...}
  more={expand => (
    <button
      style={{
        position: 'absolute',
        bottom: 0,
      }}
      onClick={expand}
    >
      Show More
    </button>
  )}
/>
```

### `less`

`function`

This is a render prop for the ShowLess button to render. It receives an argument, `collapse`.

#### `collapse`

`collapse` is a function passed to the render prop that should be called when the button is clicked in order to collapse the Unveil:

```jsx
<Unveil render={...} less={collapse => <button onClick={collapse}>Show Less</button>} />
```

### `onMoreClick`

`function`

This is the callback that is run after the Unveil is expanded.

### `onLessClick`

`function`

This is the callback that is run after the Unveil is collapsed.

### `expanded`

`bool`

This specifies whether or not the Unveil is initially expanded. There is probably some work to be done here to make this prop useful after the initial render.

## Caveats

I did not develop this library with SSR in mind and am not fully aware of any possible repercussions you may face from using this in that context. Since the initial render of Unveil is not shown onscreen, I imagine this would have a negative effect on SEO.
