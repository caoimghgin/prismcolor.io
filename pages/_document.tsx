import { Head, Html, Main, NextScript } from 'next/document';
import isPropValid from '@emotion/is-prop-valid';
import { StyleSheetManager } from 'styled-components';
import { ColorSchemeScript } from '@mantine/core';
import StyledComponentsRegistry from '@/utilities/registry';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <ColorSchemeScript />
      </Head>
      <body>
        <StyledComponentsRegistry>
          <StyleSheetManager shouldForwardProp={shouldForwardProp}>
            <Main />
            <NextScript />
          </StyleSheetManager>
        </StyledComponentsRegistry>
      </body>
    </Html>
  );
}

function shouldForwardProp(propName, target) {
  if (typeof target === 'string') {
    // For HTML elements, forward the prop if it is a valid HTML attribute
    return isPropValid(propName);
  }
  // For other elements, forward all props
  return true;
}
