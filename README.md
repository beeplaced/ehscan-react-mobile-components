# ehscan-react-mobile-components
Bundle of react Components for Mobile Web View




## 📦 Available Components

## Table of Contents
- [Mobile Header](#mobile-header)
- PopUp
- Mobile Window
- Page Swiper (for Window)
- FAB (Floating Action Button)
- SegmentNavigation

## Installation

```bash
npm ehscan-react-mobile-components
# or
yarn add ehscan-react-mobile-components
```

# Usage Examples

## Mobile Header

![Button Preview](https://raw.githubusercontent.com/beeplaced/ehscan-react-mobile-components/main/src/images/Header.png)

```jsx
import { HeaderElement } from 'ehscan-react-mobile-components';

const Page = () => {

  const doStuff = () => {
    console.log("doStuff")
  }

  const closeStuff = () => {
    console.log("closeStuff")
  }

  const DefButton = ({ onClick }) => (
    <div onClick={onClick} aria-label="menu">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#FFFFFF"
      >
        <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
      </svg>
    </div>
  );

  const CloseButton = ({ onClick }) => (
    <div onClick={onClick} aria-label="menu">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#FFFFFF"
      >
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
      </svg>
    </div>
  );

  return (<>
  <div className="inject-header-styling">
    <HeaderElement
      index={'header'}
      initButton={<DefButton onClick={doStuff} />}
      secondaryButton={<DefButton onClick={doStuff} />}
      closeButton={<CloseButton onClick={closeStuff} />}
      editButton={<DefButton onClick={doStuff} />}
      title={"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."} />
      </div>
  </>)
}

```
### Styling
```css
.inject-header-styling {
  /* Header layout */
  --ext-header-height: 50px;
  --ext-header-side-padding: 10px;
  --ext-header-gap: 3px;
  
  /* Header colors */
  --ext-header-bck-clr: #007aff;
  --ext-header-title-clr: lightslategrey;

  /* Typography */
  --ext-header-font-weight: 500;
}
```
----
# Changelog

## [0.0.8] - 2025-12-13
- Added HeaderElement, image and docu
- inject module styling