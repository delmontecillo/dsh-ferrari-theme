/**
 * Forza Ferrari — client half.
 *
 * The host half is empty; everything here runs in the Web client. `apply`
 * registers one token table (Light and Dark), one stylesheet, one artwork
 * layer, one banner switch, and one sidebar brand lockup.
 *
 * `__SHIELD__`, `__LOCKUP__` and `__CAR__` are base64 payloads substituted by
 * `tools/inline-assets.mjs` when `client.js` is generated from this template.
 */
window.__ModuleLoader__.load({
  id: '@f1forza/dsh-theme',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    /** One override for both built-in schemes, so neither mode is left behind. */
    const m = (light, dark) => ({ light, dark });

    const SHIELD = 'data:image/png;base64,__SHIELD__';
    const LOCKUP = 'data:image/png;base64,__LOCKUP__';
    const LOCKUP_DARK = 'data:image/png;base64,__LOCKUP_DARK__';
    const CAR = 'data:image/webp;base64,__CAR__';

    /* -------------------------------------------------------------------- */
    /* Palette                                                              */
    /* -------------------------------------------------------------------- */

    const TOKENS = {
      // Canvas and layers
      '--dsw-alias-bg-base': m('#F4F1EB', '#08080A'),
      '--dsw-alias-bg-document-preview': m('#ECE8E0', '#101014'),
      '--dsw-alias-label-document-preview': m('#4A4740', '#C0B9AB'),
      '--dsw-alias-bg-layer-1': m('#FAF8F3', '#101014'),
      '--dsw-alias-bg-layer-2': m('#FFFDF9', '#15151A'),
      '--dsw-alias-bg-layer-3': m('#FFFFFF', '#1D1D23'),
      '--dsw-alias-bg-mask-1': m('#0A0A0C47', '#00000099'),
      '--dsw-alias-bg-mask-2': m('#0A0A0C2E', '#00000047'),
      '--dsw-alias-bg-mask-3': m('#0A0A0C8A', '#0000008A'),
      '--dsw-alias-bg-mask-drop': m('#F4F1EBB3', '#202028B3'),
      '--dsw-alias-bg-mask-photo': m('#0A0A0CE0', '#000000E0'),
      '--dsw-alias-bg-module-platform': m('#ECE6DC', '#1A1A20'),
      '--dsw-alias-bg-multi-select': m('#F0EAE1', '#17171D'),
      '--dsw-alias-bg-overlay': m('#E2DCD2', '#26262E'),
      '--dsw-alias-bg-skeleton': m('#0A0A0C0A', '#F6F1E914'),

      // Borders
      '--dsw-alias-border-inverted': m('#00000000', '#F6F1E90F'),
      '--dsw-alias-border-inverted2': m('#00000000', '#F6F1E914'),
      '--dsw-alias-border-l1': m('#0A0A0C14', '#F6F1E914'),
      '--dsw-alias-border-l2-darkmode-thin': m('#0A0A0C1A', '#F6F1E914'),
      '--dsw-alias-border-l2': m('#0A0A0C1F', '#F6F1E924'),
      '--dsw-alias-border-l3': m('#0A0A0C33', '#F6F1E938'),
      '--dsw-alias-border-l4': m('#0A0A0C52', '#F6F1E952'),

      // Brand and buttons
      '--dsw-alias-brand-primary': m('#0A0A0C', '#F6F1E9'),
      '--dsw-alias-brand-primary-invert': m('#0A0A0C', '#F6F1E9'),
      '--dsw-alias-brand-primary-new-colorprimary-new-color': m('#C80000', '#FF2E1A'),
      '--dsw-alias-brand-text': m('#0A0A0C', '#F6F1E9'),
      '--dsw-alias-button-contrast-fill': m('#0A0A0C', '#2A2A31'),
      '--dsw-alias-button-elevated-fill': m('#FFFDF9', '#17171C'),
      '--dsw-alias-button-floating-fill': m('#FFFDF9', '#15151A'),
      '--dsw-alias-button-floating-hover': m('#F6EFE5', '#202028'),
      '--dsw-alias-button-ghost-active-border': m('#6B6458', '#F6F1E966'),
      '--dsw-alias-button-ghost-active-fill': m('#ECE5D9', '#202028'),
      '--dsw-alias-button-ghost-active-hover': m('#E0D7C7', '#26262E'),
      '--dsw-alias-button-info-fill': m('#C80000', '#E10600'),
      '--dsw-alias-button-info-hover': m('#A80000', '#FF2E1A'),
      '--dsw-alias-button-primary-dimmed': m('#ECE5D9', '#26262C'),
      '--dsw-alias-button-primary-fill': m('#B00000', '#C80000'),
      '--dsw-alias-button-primary-hover': m('#C80000', '#E10600'),
      '--dsw-alias-button-tool-bar-fill': m('#0A0A0C66', '#54555780'),
      '--dsw-alias-button-tool-bar-fill-invisible': m('#0A0A0C33', '#1F1F1F5C'),
      '--dsw-alias-button-tool-bar-hover': m('#0A0A0C88', '#54555799'),

      // Interaction
      '--dsw-alias-interactive-bg-active': m('#0A0A0C1A', '#F6F1E924'),
      '--dsw-alias-interactive-bg-hover': m('#0A0A0C0F', '#F6F1E914'),
      '--dsw-alias-interactive-bg-hover-accent': m('#0A0A0C0F', '#F6F1E914'),
      '--dsw-alias-interactive-bg-hover-danger': m('#B3261E14', '#FF646426'),
      '--dsw-alias-interactive-bg-hover-solid': m('#ECE5D9', '#202028'),

      // Labels
      '--dsw-alias-label-caption': m('#6E6658', '#9B9486'),
      '--dsw-alias-label-dimmed': m('#D6CEC0', '#2A2A2C'),
      '--dsw-alias-label-primary': m('#0A0A0C', '#F6F1E9'),
      '--dsw-alias-label-primary-bluish': m('#00693E', '#C7F0D8'),
      '--dsw-alias-label-primary-dimmed': m('#26241F', '#E8E2D5'),
      '--dsw-alias-label-primary-foreground': m('#FFFDF9', '#F6F1E9'),
      '--dsw-alias-label-primary-inverted': m('#FFFDF9', '#F6F1E9'),
      '--dsw-alias-label-secondary': m('#3F3A33', '#C5BFB2'),
      '--dsw-alias-label-tertiary': m('#5C564B', '#A39C8E'),
      '--dsw-alias-link': m('#B00000', '#FF8A73'),
      '--dsw-alias-menu-icon': m('#26241F', '#E8E2D5'),

      // Markdown and code
      '--dsw-alias-markdown-citation': m('#ECE5D9', '#202028'),
      '--dsw-alias-markdown-code-block': m('#E9E3D8', '#08080A'),
      '--dsw-alias-markdown-code-block-banner': m('#EFE9DE', '#101014'),
      '--dsw-alias-markdown-code-segment-selected': m('#FFFDF9', '#1D1D23'),
      '--dsw-alias-markdown-code-segment-unselected': m('#ECE5D9', '#08080A'),
      '--dsw-alias-markdown-inline-code': m('#EDE6D9', '#1A1A20'),
      '--dsw-alias-markdown-placeholder': m('#ECE5D9', '#1A1A20'),
      '--dsw-alias-markdown-tag': m('#ECE5D9', '#202028'),

      // Scrollbars
      '--dsw-alias-scrollbar-bg-l1': m('#0A0A0C14', '#F6F1E914'),
      '--dsw-alias-scrollbar-bg-l2': m('#0A0A0C1F', '#F6F1E91F'),
      '--dsw-alias-scrollbar-hover-l1': m('#C8000099', '#FF2E1A99'),
      '--dsw-alias-scrollbar-hover-l2': m('#A8000099', '#FF2E1A99'),

      // State colors
      '--dsw-alias-state-business-primary': m('#00693E', '#4ADE80'),
      '--dsw-alias-state-business-tertiary': m('#DCF2E5', '#04271A'),
      '--dsw-alias-state-error-primary': m('#B3261E', '#FF6B5A'),
      '--dsw-alias-state-error-secondary': m('#D0453A', '#FF8E80'),
      '--dsw-alias-state-idle-primary': m('#9A9285', '#5E5A52'),
      '--dsw-alias-state-success-primary': m('#1B8F4A', '#7CFF8A'),
      '--dsw-alias-state-success-secondary': m('#2FAE63', '#44D17C'),
      '--dsw-alias-state-success-tertiary': m('#DDF4E5', '#12281B'),
      '--dsw-alias-state-warn-label': m('#8A5300', '#FFD37E'),
      '--dsw-alias-state-warn-primary': m('#C47A00', '#FFB020'),
      '--dsw-alias-state-warn-secondary': m('#E09A1E', '#FF9F1C'),
      '--dsw-alias-state-warn-tertiary': m('#FBEED2', '#2E2411'),
      '--dsw-alias-code-diff-added': m('#1B8F4A14', '#8DFFB018'),
      '--dsw-alias-code-diff-deleted': m('#B3261E14', '#FF646418'),
      '--dsw-alias-file-diff-added-bg': m('#E2F4E6', '#14261A'),
      '--dsw-alias-file-diff-added-gutter': m('#EDF8EF', '#0F1B13'),
      '--dsw-alias-file-diff-added-marker': m('#1B8F4A', '#7CFF8A'),
      '--dsw-alias-file-diff-deleted-bg': m('#FBE7E5', '#2A1416'),
      '--dsw-alias-file-diff-deleted-gutter': m('#FDEFEC', '#1E0E10'),
      '--dsw-alias-file-diff-deleted-marker': m('#B3261E', '#FF5C5C'),

      // Surfaces and menus
      '--dsw-alias-settings-card-fill': m('#FFFDF9', '#15151A'),
      '--dsw-alias-settings-card-stroke': m('#0A0A0C1A', '#F6F1E91F'),
      '--dsw-alias-toast-bg': m('#0A0A0C', '#F6F1E9'),
      '--dsw-alias-toast-label': m('#F6F1E9', '#08080A'),
      '--dsw-alias-tooltip-bg': m('#0A0A0C', '#F6F1E9'),
      '--dsw-alias-tooltip-key-bg': m('#2B2B2E', '#D8D0C1'),
      '--dsw-alias-onboarding-accent': m('#C80000', '#FF2E1A'),
      '--dsw-alias-onboarding-card-fill': m('#FFFDF9', '#15151A'),
      '--dsw-alias-onboarding-checkbox-border': m('#0A0A0C42', '#F6F1E942'),
      '--dsw-alias-onboarding-secondary-fill': m('#ECE5D9', '#202028'),
      '--dsw-menu-surface-fill': m('#FFFDF9F0', '#14141AE6'),
      '--dsw-menu-backdrop-filter': m('blur(28px) saturate(145%)', 'blur(28px) saturate(145%)'),
      '--dsw-specific-menu': m('#FFFDF9F0', '#14141AE6'),
      '--dsw-specific-bubble': m('#FFFDF9', '#1B1B22'),
      '--dsw-specific-bubble-highlight': m('#FAF8F3', '#212128'),
      '--dsw-specific-input-major': m('#FFFDF9', '#0C0C10'),
      '--dsw-specific-login-input': m('#FAF8F3', '#0C0C10'),
      '--dsw-specific-selector': m('#ECE6DC', '#1A1A20'),
      '--dsw-specific-sidebar-fill': m('#EDE7DD', '#0B0B0F'),
      '--dsw-specific-sidebar-nav-item-active': m('#FFFDF9', '#17171E'),
      '--dsw-specific-sidebar-nav-item-active-accent': m('#C80000', '#FF2E1A'),
      '--dsw-specific-sidebar-nav-item-hover': m('#E3DCD0', '#141419'),
      '--dsw-specific-tip': m('#FFFDF9', '#1B1B22'),

      // Shape, focus, and depth
      '--dsw-radius-xs': m('2px', '2px'),
      '--dsw-radius-sm': m('5px', '5px'),
      '--dsw-radius-md': m('8px', '8px'),
      '--dsw-radius-lg': m('12px', '12px'),
      '--dsw-radius-xl': m('16px', '16px'),
      '--dsw-radius-panel': m('20px', '20px'),
      '--dsw-focus-ring-color': m('#C80000', '#FF2E1A'),
      '--dsw-focus-ring-width': m('2px', '2px'),
      '--dsw-elevation-stroke-color': m('var(--dsw-alias-border-l4)', 'var(--dsw-alias-border-l4)'),
      '--dsw-shadow-lv1': m('0 1px 0 #0A0A0C14, 0 0 0 1px #0A0A0C0F', '0 1px 0 #00000080, 0 0 0 1px #F6F1E90A'),
      '--dsw-shadow-lv1-blur': m('0 6px 18px #0A0A0C14', '0 6px 18px #00000066'),
      '--dsw-shadow-lv2': m('0 2px 0 #0A0A0C10, 0 10px 28px #0A0A0C14, 0 0 0 1px #0A0A0C14', '0 2px 0 #00000099, 0 10px 28px #00000066, 0 0 0 1px #F6F1E91A'),
      '--dsw-shadow-lv3': m('0 24px 64px #0A0A0C1F, 0 0 0 1px #0A0A0C1A', '0 24px 64px #00000099, 0 0 0 1px #F6F1E91F'),
      '--dsw-linear-gradient-think': m('linear-gradient(180deg, #FFFDF9 20.19%, #FFFDF900 100%)', 'linear-gradient(180deg, #15151A 20.19%, #15151A00 100%)'),
      '--dsw-linear-think-select': m('linear-gradient(180deg, #F6EFE5 20.19%, #F6EFE500 100%)', 'linear-gradient(180deg, #202028 20.19%, #20202800 100%)'),

      // Theme-local values read by the stylesheet
      '--f1-red': m('#C80000', '#FF2E1A'),
      '--f1-red-deep': m('#8E0000', '#B00000'),
      '--f1-red-bright': m('#E10600', '#FF5A3C'),
      '--f1-on-red': m('#FFFBF4', '#FFF6EE'),
      '--f1-yellow': m('#E8C400', '#FFE600'),
      '--f1-green': m('#008C45', '#28C76F'),
      '--f1-ink': m('#0A0A0C', '#F6F1E9'),
      '--f1-paper': m('#F4F1EB', '#08080A'),
      '--f1-stroke': m('#0A0A0C1F', '#F6F1E924'),
      '--f1-plate': m('#FBF7EF', '#111116'),
      '--f1-plate-ink': m('#0F0F12', '#F6F1E9'),
      '--f1-red-soft': m('#C8000024', '#FF2E1A2E'),
      '--f1-tier-1': m('#F4F1EB', '#0B0B0F'),
      '--f1-tier-2': m('#FBF7EF', '#111116'),
      /* Canvas weave: two crossed passes, barely there. */
      '--f1-weave-a': m('#0A0A0C08', '#F6F1E90A'),
      '--f1-weave-b': m('#0A0A0C0A', '#0000003C'),
      /* Artwork opacities. */
      '--f1-car-opacity': m('0.11', '0.13'),
      '--f1-shield-opacity': m('0.04', '0.045'),
      /* Sidebar pools. */
      '--f1-side-a': m('#C8000021', '#FF2E1A26'),
      '--f1-side-b': m('#E8C4001C', '#FFE60018'),
      '--f1-checker': m('#0A0A0C', '#F6F1E9'),
      /* The supplied wordmark, recoloured per scheme so it never needs a plate. */
      '--f1-wordmark': m(`url("${LOCKUP}")`, `url("${LOCKUP_DARK}")`),
    };

    /* -------------------------------------------------------------------- */
    /* Stylesheet                                                           */
    /* -------------------------------------------------------------------- */

    const CSS = String.raw`
      /* ---------- Canvas ------------------------------------------------- */

      body[data-f1-theme] {
        background-color: var(--dsw-alias-bg-base);
        color: var(--dsw-alias-label-primary);
        accent-color: var(--f1-red);
        -webkit-font-smoothing: antialiased;
        /* Carbon weave: two crossed passes at single-digit alpha. */
        background-image:
          repeating-linear-gradient(45deg, var(--f1-weave-a) 0 3px, transparent 3px 6px),
          repeating-linear-gradient(-45deg, var(--f1-weave-b) 0 3px, transparent 3px 6px);
      }

      body[data-f1-theme] ::selection,
      body[data-f1-theme]::selection {
        background: color-mix(in srgb, var(--f1-red) 34%, transparent);
        color: var(--dsw-alias-label-primary);
      }

      /* Start-line ribbon pinned to the top of the window. It begins at the
         conversation column so the rail keeps its own header edge, and lives on
         body::before because the body paints its own opaque canvas over any
         pseudo-element hung off <html>. */
      body[data-f1-theme]::before {
        content: "";
        position: fixed;
        top: 0;
        right: 0;
        left: var(--f1-col-left, 0);
        height: 2px;
        z-index: 2147483000;
        pointer-events: none;
        background: linear-gradient(
          90deg,
          var(--f1-green) 0 33.4%,
          #F7F5EF 33.4% 66.7%,
          #CD212A 66.7% 100%);
        opacity: .92;
      }

      body[data-f1-theme] [class*="frame"] {
        background-color: var(--dsw-alias-bg-base);
        background-image: none;
      }

      body[data-f1-theme] [class*="frame"] [class*="frame"] {
        background-color: var(--dsw-alias-bg-base) !important;
        background-image: none !important;
      }

      body[data-f1-theme] [class*="wSkVaW_root"] {
        background-color: transparent !important;
        background-image: none !important;
      }

      body[data-f1-theme] [data-conversation-content] {
        background-color: transparent !important;
        background-image: none !important;
      }

      body[data-f1-theme] [class*="rightbarCol"],
      body[data-f1-theme] [class*="bottomRow"] {
        background-color: transparent !important;
        background-image: none !important;
        border-color: color-mix(in srgb, var(--f1-stroke) 55%, transparent) !important;
        box-shadow: none !important;
      }

      body[data-f1-theme] [class*="frame"] :has([data-composer-card]) {
        background: transparent !important;
      }

      body[data-f1-theme] [class*="frame"] [data-composer-seat],
      body[data-f1-theme] [class*="frame"] [class*="bottomRow"] {
        background-color: transparent !important;
        background-image: none !important;
        border-color: color-mix(in srgb, var(--f1-stroke) 55%, transparent) !important;
        box-shadow: none !important;
      }

      /* ---------- Sidebar ------------------------------------------------ */

      body[data-f1-theme] [class*="sidebarCol"] {
        position: relative;
        background-color: var(--dsw-specific-sidebar-fill);
        border-right: 1px solid var(--f1-stroke);
      }

      /* Tricolore on the rail's inner edge, fading out under the brand row. */
      body[data-f1-theme] [class*="sidebarCol"]::after {
        content: "";
        position: absolute;
        top: 0;
        right: -1px;
        width: 2px;
        height: 96px;
        pointer-events: none;
        background: linear-gradient(
          180deg,
          var(--f1-green) 0 22%,
          #F7F5EF 22% 44%,
          #CD212A 44% 66%,
          transparent 66% 100%);
        opacity: .85;
      }

      body[data-f1-theme] [class*="sidebarCol"] > [data-slot="sidebar"] > [class*="root"] {
        background-color: var(--dsw-specific-sidebar-fill);
        background-image:
          radial-gradient(88% 58% at 50% -8%, var(--f1-side-a), transparent 72%),
          radial-gradient(88% 52% at 50% 108%, var(--f1-side-b), transparent 72%);
      }

      /* The Windows titlebar strip sits above the rail; carry the red pool up. */
      html[data-windows-titlebar] body[data-f1-theme] [class*="frame"]::before {
        background-image: radial-gradient(
          calc(var(--f1-col-left, 280px) * 0.8) 130%
          at calc(var(--f1-col-left, 280px) / 2) 100%,
          var(--f1-side-a),
          transparent 78%);
      }

      /* The supplied wordmark, swapped per scheme by --f1-wordmark. */
      body[data-f1-theme] .f1-wordmark {
        display: block;
        width: 116px;
        height: 20px;
        background-image: var(--f1-wordmark);
        background-size: contain;
        background-position: left center;
        background-repeat: no-repeat;
      }

      /* The supplied crest, on the rail and in the empty-state plate. Its edge
         comes from the slot's own size prop, so no fixed box is imposed. */
      body[data-f1-theme] .f1-crest {
        display: block;
        object-fit: contain;
        filter: drop-shadow(0 1px 2px #00000055);
      }

      /* Hero mark: the host renders the occupant inside its 34px fish hitbox.
         The crest goes in at the size it asks for — its own tricolore sits at
         the top of the emblem — and the hitbox becomes a cream race plate. */
      body[data-f1-theme] [class*="fishHitbox"] {
        position: relative;
        box-sizing: border-box;
        padding: 9px 10px;
        border-radius: 6px;
        background: #FBF7EF;
        box-shadow:
          0 0 0 1px #0A0A0C2E,
          0 10px 24px #0A0A0C26,
          inset 0 -3px 0 #CD212A;
      }

      body[data-f1-theme] [role="treeitem"][aria-selected="true"] {
        background: linear-gradient(90deg, var(--f1-red-soft), transparent 92%) !important;
        box-shadow: inset 3px 0 0 var(--f1-red);
      }

      body[data-f1-theme] [class*="sessionRow"]:hover {
        background: var(--dsw-alias-interactive-bg-hover) !important;
      }

      /* ---------- Turn rail ---------------------------------------------- */

      body[data-f1-theme] [class*="marks"] > [class*="mark"]::before {
        background: color-mix(in srgb, var(--f1-red) var(--f1-tick, 55%), #8C8F8E) !important;
      }

      body[data-f1-theme] [class*="markActive"] {
        --f1-tick: 100%;
      }

      body[data-f1-theme] [class*="markActive"]::before {
        width: 22px !important;
        height: 3px !important;
        border-radius: 1px;
        box-shadow: 0 0 8px color-mix(in srgb, var(--f1-red) 65%, transparent);
      }

      body[data-f1-theme] [class*="SNx2jG_frame"] {
        background-color: transparent !important;
        background-image: none !important;
        border-radius: 8px;
      }

      /* ---------- Hero --------------------------------------------------- */

      body[data-f1-theme] [data-phase="hero"] {
        position: relative;
      }

      body[data-f1-theme] [data-phase="hero"] [class*="headline"] {
        font-family: var(--f1-display) !important;
        font-style: italic;
        font-weight: 800 !important;
        letter-spacing: -.025em !important;
        text-transform: uppercase;
      }

      /* ---------- Composer ---------------------------------------------- */

      body[data-f1-theme] [data-composer-card] {
        position: relative;
        background-color: var(--f1-tier-2) !important;
        background-image: none !important;
        border: 1px solid var(--f1-stroke) !important;
        border-radius: 8px !important;
        box-shadow:
          inset 0 1px 0 color-mix(in srgb, #FFFFFF 8%, transparent),
          0 12px 34px #0000001F !important;
        transition: border-color .15s ease, box-shadow .15s ease;
      }

      /* Speed rule along the input's leading edge. */
      body[data-f1-theme] [data-composer-card]::before {
        content: "";
        position: absolute;
        top: -1px;
        left: 10px;
        right: 10px;
        height: 2px;
        border-radius: 2px;
        pointer-events: none;
        background: linear-gradient(
          90deg,
          var(--f1-red) 0 18%,
          var(--f1-yellow) 18% 30%,
          color-mix(in srgb, var(--f1-red) 30%, transparent) 30% 100%);
        opacity: .75;
      }

      body[data-f1-theme] [data-composer-card]:focus-within {
        border-color: color-mix(in srgb, var(--f1-red) 70%, transparent) !important;
        box-shadow:
          inset 0 1px 0 color-mix(in srgb, #FFFFFF 8%, transparent),
          0 0 0 1px color-mix(in srgb, var(--f1-red) 40%, transparent),
          0 14px 38px #00000026 !important;
      }

      body[data-f1-theme] [data-composer-placeholder] {
        color: var(--dsw-alias-label-tertiary);
      }

      /* ---------- Buttons ------------------------------------------------ */

      body[data-f1-theme] button[class*="newSession"] {
        background: linear-gradient(
          100deg,
          var(--f1-red-deep) 0%,
          var(--f1-red) 52%,
          var(--f1-red-bright) 100%) !important;
        color: var(--f1-on-red) !important;
        border: 0 !important;
        border-radius: 6px !important;
        box-shadow:
          0 0 0 1px color-mix(in srgb, var(--f1-red-deep) 70%, transparent),
          4px 4px 0 color-mix(in srgb, var(--f1-yellow) 85%, transparent),
          0 8px 22px color-mix(in srgb, var(--f1-red) 26%, transparent) !important;
        font-family: var(--f1-display) !important;
        font-style: italic;
        font-weight: 800 !important;
        letter-spacing: .05em;
        text-transform: uppercase;
        transition: transform .12s ease, box-shadow .12s ease, filter .12s ease;
      }

      body[data-f1-theme] button[class*="newSession"]:hover {
        filter: saturate(1.08) brightness(1.03);
        transform: translate(-1px, -1px);
        box-shadow:
          0 0 0 1px color-mix(in srgb, var(--f1-red-deep) 70%, transparent),
          5px 5px 0 var(--f1-yellow),
          0 10px 26px color-mix(in srgb, var(--f1-red) 30%, transparent) !important;
      }

      body[data-f1-theme] button[class*="newSession"]:active {
        transform: translate(1px, 1px);
        box-shadow:
          0 0 0 1px color-mix(in srgb, var(--f1-red-deep) 70%, transparent),
          2px 2px 0 color-mix(in srgb, var(--f1-yellow) 85%, transparent) !important;
      }

      body[data-f1-theme] button[class*="newSession"] kbd {
        border-color: color-mix(in srgb, var(--f1-on-red) 40%, transparent) !important;
        background: color-mix(in srgb, var(--f1-on-red) 16%, transparent) !important;
        color: var(--f1-on-red) !important;
      }

      body[data-f1-theme] [class*="newSessionContent"],
      body[data-f1-theme] [class*="newSessionLabel"] {
        color: var(--f1-on-red) !important;
      }

      body[data-f1-theme] button[aria-label="Send message"]:not(:disabled) {
        background: linear-gradient(150deg, var(--f1-red-bright), var(--f1-red-deep)) !important;
        color: var(--f1-on-red) !important;
        border-radius: 7px !important;
        box-shadow:
          0 0 0 1px color-mix(in srgb, var(--f1-red-deep) 60%, transparent),
          0 6px 16px color-mix(in srgb, var(--f1-red) 32%, transparent) !important;
        transition: filter .12s ease, transform .12s ease;
      }

      body[data-f1-theme] button[aria-label="Send message"]:not(:disabled):hover {
        filter: brightness(1.1) saturate(1.05);
        transform: translateY(-1px);
      }

      body[data-f1-theme] button[class*="themeCube"][aria-pressed="true"] {
        border-color: var(--f1-red) !important;
        box-shadow: 0 0 0 1px var(--f1-red), 3px 3px 0 var(--f1-red-soft);
      }

      /* ---------- Bubble, scrollbars, mark ------------------------------ */

      body[data-f1-theme] [class*="userStack"] [class*="bubble"] {
        border: 1px solid var(--f1-stroke) !important;
        box-shadow: inset 3px 0 0 var(--f1-red);
      }

      body[data-f1-theme] ::-webkit-scrollbar {
        width: 7px;
        height: 7px;
        background: transparent;
      }

      body[data-f1-theme] ::-webkit-scrollbar-track {
        background: transparent;
      }

      body[data-f1-theme] ::-webkit-scrollbar-thumb {
        background: var(--dsw-alias-scrollbar-bg-l1);
        border-radius: 99px;
      }

      body[data-f1-theme] ::-webkit-scrollbar-thumb:hover {
        background: var(--dsw-alias-scrollbar-hover-l1);
      }

      /* Recolor the hardcoded amber/cyan Start-tab glyphs into the theme. */
      body[data-f1-theme] [class*="entryIcon"] svg [fill="#FFBC4D"] {
        fill: var(--f1-red) !important;
      }

      body[data-f1-theme] [class*="entryIcon"] svg [stroke="#FFCD78"] {
        stroke: var(--f1-red) !important;
      }

      body[data-f1-theme] [class*="entryIcon"] svg [stroke="#679EFE"] {
        stroke: var(--f1-yellow) !important;
      }

      /* ---------- Artwork layer ----------------------------------------- */

      body[data-f1-theme] .f1-art {
        position: fixed;
        inset: 0;
        z-index: 4;
        pointer-events: none;
      }

      /* The car: grayscale ghost of the SF-25, feathered into the canvas at the
         bottom-left of the conversation column. A single elliptical mask keeps
         every edge soft, so it reads as printed tone rather than a photo box. */
      body[data-f1-theme] .f1-art__car {
        position: absolute;
        left: calc(var(--f1-col-left, 280px) - 34px);
        bottom: -26px;
        width: min(52vw, 630px);
        aspect-ratio: 1400 / 788;
        background-image: url("${CAR}");
        background-size: contain;
        background-position: left bottom;
        background-repeat: no-repeat;
        opacity: var(--f1-car-opacity);
        filter: grayscale(1) contrast(1.12);
        mix-blend-mode: multiply;
        /* Opaque in the bottom-left corner, gone at the top and right edges:
           the car reads as printed into the canvas, without a photo box. */
        -webkit-mask-image:
          linear-gradient(to top, #000 0%, #000 46%, transparent 96%),
          linear-gradient(to right, #000 0%, #000 52%, transparent 97%);
        -webkit-mask-composite: source-in;
        mask-image:
          linear-gradient(to top, #000 0%, #000 46%, transparent 96%),
          linear-gradient(to right, #000 0%, #000 52%, transparent 97%);
        mask-composite: intersect;
      }

      body[data-f1-theme][data-ds-dark-theme] .f1-art__car {
        mix-blend-mode: normal;
        filter: invert(1) grayscale(1) contrast(1.06);
      }

      /* The crest: a large, very faint livery mark bleeding out of the
         bottom-right corner, under where the composer band sits. */
      body[data-f1-theme] .f1-art__shield {
        position: absolute;
        right: 26px;
        bottom: 30px;
        width: min(20vw, 258px);
        aspect-ratio: 177 / 225;
        transform: rotate(-6deg);
        background-image: url("${SHIELD}");
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        opacity: var(--f1-shield-opacity);
      }

      /* Finish line: one checker row along the window floor. */
      body[data-f1-theme] .f1-art__checker {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 5px;
        opacity: .2;
        background-image:
          conic-gradient(
            var(--f1-checker) 0 25%,
            transparent 0 50%,
            var(--f1-checker) 0 75%,
            transparent 0);
        background-size: 10px 10px;
        -webkit-mask-image: linear-gradient(to right, transparent, #000 18%, #000 82%, transparent);
        mask-image: linear-gradient(to right, transparent, #000 18%, #000 82%, transparent);
      }

      /* ---------- Pit-wall decal ---------------------------------------- */

      body[data-f1-theme] .f1-pit {
        display: flex;
        align-items: center;
        gap: 7px;
        min-width: 0;
        padding: 1px 2px;
        color: var(--dsw-alias-label-caption);
        font-family: var(--f1-display);
        font-size: 9px;
        font-weight: 600;
        letter-spacing: .2em;
        line-height: 1;
        text-transform: uppercase;
        user-select: none;
      }

      body[data-f1-theme] .f1-pit__crest {
        width: 11px;
        height: 14px;
        flex: none;
        object-fit: contain;
        opacity: .9;
      }

      body[data-f1-theme] .f1-pit__bars {
        display: inline-flex;
        gap: 2px;
        transform: skewX(-20deg);
      }

      body[data-f1-theme] .f1-pit__bar {
        display: block;
        width: 3px;
        height: 10px;
        border-radius: 1px;
      }

      body[data-f1-theme] .f1-pit__bar--green { background: var(--f1-green); }
      body[data-f1-theme] .f1-pit__bar--white { background: #F7F5EF; }
      body[data-f1-theme] .f1-pit__bar--red { background: #CD212A; }

      body[data-f1-theme] .f1-pit__label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      body[data-f1-theme] .f1-pit__dot {
        width: 2px;
        height: 2px;
        flex: none;
        border-radius: 99px;
        background: currentColor;
        opacity: .6;
      }

      body[data-f1-theme] .f1-pit__number {
        color: var(--f1-red);
        font-size: 10px;
        font-style: italic;
        font-weight: 800;
        letter-spacing: .04em;
      }

      body[data-f1-theme] .f1-pit__checker {
        width: 26px;
        height: 8px;
        flex: none;
        border-radius: 1px;
        opacity: .55;
        background-image:
          conic-gradient(
            currentColor 0 25%,
            transparent 0 50%,
            currentColor 0 75%,
            transparent 0);
        background-size: 8px 8px;
      }

      /* ---------- Banner switch ------------------------------------------ */

      body[data-f1-theme] .f1-mode-toggle {
        box-sizing: border-box;
        display: inline-flex;
        flex: none;
        align-items: center;
        justify-content: center;
        width: 34px;
        height: 24px;
        margin: 0;
        padding: 0 5px;
        gap: 3px;
        border: 1px solid var(--f1-stroke);
        border-radius: 5px;
        background: color-mix(in srgb, var(--f1-ink) 8%, transparent);
        color: var(--f1-red);
        box-shadow: inset 0 1px 0 color-mix(in srgb, #FFFFFF 6%, transparent);
        cursor: pointer;
        transition: border-color .15s ease, background .15s ease;
      }

      body[data-f1-theme] .f1-mode-toggle:hover {
        border-color: var(--f1-red);
        background: var(--f1-red-soft);
      }

      body[data-f1-theme] .f1-mode-toggle:focus-visible {
        outline: 2px solid var(--f1-red);
        outline-offset: 2px;
      }

      body[data-f1-theme] .f1-mode-toggle__lamp {
        width: 4px;
        height: 4px;
        border-radius: 99px;
        background: color-mix(in srgb, var(--f1-red) 30%, transparent);
        box-shadow: none;
        transition: background .15s ease, box-shadow .15s ease;
      }

      body[data-f1-theme][data-ds-dark-theme] .f1-mode-toggle__lamp {
        background: var(--f1-red);
        box-shadow: 0 0 5px color-mix(in srgb, var(--f1-red) 75%, transparent);
      }

      body[data-f1-theme] .f1-mode-toggle:hover .f1-mode-toggle__lamp {
        background: var(--f1-yellow);
        box-shadow: 0 0 6px color-mix(in srgb, var(--f1-yellow) 70%, transparent);
      }

      /* ---------- Small screens and motion ------------------------------- */

      @media (max-width: 1100px) {
        body[data-f1-theme] .f1-art__shield {
          display: none;
        }
      }

      @media (max-width: 900px) {
        body[data-f1-theme] .f1-art__car {
          width: min(72vw, 460px);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        body[data-f1-theme] button[class*="newSession"],
        body[data-f1-theme] button[aria-label="Send message"],
        body[data-f1-theme] [data-composer-card] {
          transition: none;
        }
      }
    `;

    /* -------------------------------------------------------------------- */
    /* Behaviour                                                            */
    /* -------------------------------------------------------------------- */

    const NS = 'forza-ferrari';
    const DISPLAY_FONT =
      '"Bahnschrift SemiCondensed", "Bahnschrift", "F1 Regular", "Segoe UI Variable Display", "Segoe UI", sans-serif';

    /** Accent lost per step away from the active turn, in percent. */
    const RAIL_FALLOFF = 17;

    /**
     * Writes --f1-tick on every turn-rail mark: 100% at the active turn, fading
     * toward grey with distance from it. CSS cannot compare siblings, so each
     * mark carries its own accent ratio.
     */
    function paintRailFalloff() {
      for (const rail of document.querySelectorAll('[class*="marks"]')) {
        const marks = Array.from(rail.children).filter(
          (el) => typeof el.className === 'string' && el.className.includes('_mark'),
        );
        if (marks.length === 0) continue;
        const active = marks.findIndex((el) => el.className.includes('markActive'));
        marks.forEach((el, i) => {
          const mix = active < 0 ? 55 : Math.max(0, 100 - Math.abs(i - active) * RAIL_FALLOFF);
          el.style.setProperty('--f1-tick', `${mix}%`);
        });
      }
    }

    const zh = {
      'mode.toDark': 'åˆ‡æ¢åˆ°æ·±è‰²æ¨¡å¼',
      'mode.toLight': 'åˆ‡æ¢åˆ°æµ…è‰²æ¨¡å¼',
    };

    const en = {
      'mode.toDark': 'Switch to dark mode',
      'mode.toLight': 'Switch to light mode',
    };

    /** Sidebar brand row: the crest comes from the mark slot, wordmark here. */
    function BrandLockup() {
      return h('span', {
        className: 'f1-wordmark',
        role: 'img',
        'aria-label': 'Scuderia Ferrari',
        title: 'Scuderia Ferrari',
      });
    }

    /** The supplied crest, used for both brand marks and the hero plate. */
    function Crest({ size }) {
      return h('img', {
        className: 'f1-crest',
        src: SHIELD,
        width: size || 22,
        height: size ? Math.round(size * (225 / 177)) : 27,
        alt: '',
        'aria-hidden': true,
        draggable: false,
      });
    }

    /** Crest on the empty state, sized to the host's requested square edge. */
    function HeroMark({ size }) {
      const edge = size || 34;
      return h(Crest, { size: edge });
    }

    /** Pit-wall strip under the composer: crest, tricolore, team, number, flag. */
    function PitStrip() {
      return h(
        'div',
        { className: 'f1-pit', 'aria-hidden': true },
        h('img', { className: 'f1-pit__crest', src: SHIELD, alt: '', draggable: false }),
        h(
          'span',
          { className: 'f1-pit__bars' },
          h('span', { className: 'f1-pit__bar f1-pit__bar--green' }),
          h('span', { className: 'f1-pit__bar f1-pit__bar--white' }),
          h('span', { className: 'f1-pit__bar f1-pit__bar--red' }),
        ),
        h('span', { className: 'f1-pit__label' }, 'Scuderia Ferrari'),
        h('span', { className: 'f1-pit__dot' }),
        h('span', { className: 'f1-pit__number' }, '№16'),
        h('span', { className: 'f1-pit__checker' }),
      );
    }

    /**
     * Start-light gantry: five lamps that read as the theme switch. All lamps
     * are lit in the dark scheme, dim in the light one.
     */
    function StartLights() {
      return h(
        'span',
        { className: 'f1-mode-toggle__lamps', 'aria-hidden': true },
        [0, 1, 2, 3, 4].map((i) => h('span', { key: i, className: 'f1-mode-toggle__lamp' })),
      );
    }

    function ModeToggle({ t, setTheme }) {
      const [dark, setDark] = React.useState(() =>
        document.body.hasAttribute('data-ds-dark-theme'),
      );

      React.useEffect(() => {
        const body = document.body;
        const sync = () => setDark(body.hasAttribute('data-ds-dark-theme'));
        sync();
        const observer = new MutationObserver(sync);
        observer.observe(body, { attributes: true, attributeFilter: ['data-ds-dark-theme'] });
        return () => observer.disconnect();
      }, []);

      const action = dark ? t('mode.toLight') : t('mode.toDark');
      const onClick = React.useCallback(() => setTheme(dark ? 'light' : 'dark'), [dark, setTheme]);

      return h(
        'button',
        {
          type: 'button',
          className: 'f1-mode-toggle',
          'aria-label': action,
          title: action,
          'data-f1-mode': dark ? 'dark' : 'light',
          onClick,
        },
        h(StartLights),
      );
    }

    return {
      inject: ['theme', 'slots', 'locale'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'f1-theme: locale');

        /* Display font as a root variable so the stylesheet and any future rule
           share one stack. */
        ctx.effect(() => {
          const root = document.documentElement;
          root.style.setProperty('--f1-display', DISPLAY_FONT);
          return () => root.style.removeProperty('--f1-display');
        }, 'f1-theme: display font');

        ctx.effect(() => {
          document.body.setAttribute('data-f1-theme', 'forza');
          return () => document.body.removeAttribute('data-f1-theme');
        }, 'f1-theme: body marker');

        ctx.effect(
          () => ctx.theme.overrideTokens('@f1forza/dsh-theme', TOKENS),
          'f1-theme: token overrides',
        );

        ctx.effect(() => {
          const style = document.createElement('style');
          style.dataset.f1Theme = 'forza';
          style.textContent = CSS;
          document.head.append(style);
          return () => style.remove();
        }, 'f1-theme: global styles');

        /* Decorative layer: car ghost, crest ghost, race number, finish line.
           Fixed and pointer-transparent, so it never intercepts a click. */
        ctx.effect(() => {
          const art = document.createElement('div');
          art.className = 'f1-art';
          art.setAttribute('aria-hidden', 'true');
          art.innerHTML =
            '<div class="f1-art__shield"></div>' +
            '<div class="f1-art__car"></div>' +
            '<div class="f1-art__checker"></div>';
          document.body.append(art);
          return () => art.remove();
        }, 'f1-theme: artwork layer');

        ctx.effect(() => {
          let pending = 0;
          const schedule = () => {
            if (pending) return;
            pending = requestAnimationFrame(() => {
              pending = 0;
              paintRailFalloff();
            });
          };
          paintRailFalloff();
          const observer = new MutationObserver(schedule);
          observer.observe(document.body, {
            subtree: true,
            childList: true,
            attributes: true,
            attributeFilter: ['class'],
          });
          return () => {
            observer.disconnect();
            if (pending) cancelAnimationFrame(pending);
            for (const el of document.querySelectorAll('[class*="marks"] > *')) {
              el.style.removeProperty('--f1-tick');
            }
          };
        }, 'f1-theme: rail falloff');

        /* The artwork is anchored to the conversation column, which slides when
           the sidebar collapses. Track its left edge on a variable both the car
           and the numeral read. */
        ctx.effect(() => {
          const root = document.documentElement;
          let watched = null;
          let left = -1;
          const sync = () => {
            const column = document.querySelector('[class*="centerCol"]');
            const next = column ? Math.round(column.getBoundingClientRect().left) : 0;
            if (next === left) return;
            left = next;
            root.style.setProperty('--f1-col-left', `${next}px`);
          };
          const ro = new ResizeObserver(sync);
          const ensure = () => {
            const column = document.querySelector('[class*="centerCol"]');
            if (column && column !== watched) {
              if (watched) ro.unobserve(watched);
              watched = column;
              ro.observe(column);
            }
            sync();
          };
          ensure();
          ro.observe(document.body);
          window.addEventListener('resize', ensure);
          let pending = 0;
          const observer = new MutationObserver(() => {
            if (pending) return;
            pending = requestAnimationFrame(() => {
              pending = 0;
              ensure();
            });
          });
          observer.observe(document.body, { subtree: true, childList: true });
          return () => {
            observer.disconnect();
            ro.disconnect();
            window.removeEventListener('resize', ensure);
            if (pending) cancelAnimationFrame(pending);
            root.style.removeProperty('--f1-col-left');
          };
        }, 'f1-theme: artwork anchor');

        const t = ctx.locale.bind(NS);
        const BoundModeToggle = (props) =>
          h(ModeToggle, {
            ...props,
            t,
            setTheme: (id) => ctx.theme.setTheme(id),
          });

        ctx.slots.inject('conversation.session.header.utilities', () =>
          ctx.slots.register(
            {
              name: 'conversation.session.header.utilities',
              id: 'f1-mode-toggle',
              order: 5,
            },
            BoundModeToggle,
          ),
        );

        /* Both brand marks wear the supplied crest: the rail glyph and the
           empty-state plate. Lowest priority shadows the product artwork. */
        ctx.slots.inject('sidebar.brand.mark', () =>
          ctx.slots.register(
            { name: 'sidebar.brand.mark', priority: -1 },
            ({ size }) => h(Crest, { size: size || 22 }),
          ),
        );

        ctx.slots.inject('conversation.hero.brand.mark', () =>
          ctx.slots.register(
            { name: 'conversation.hero.brand.mark' },
            ({ size }) => h(HeroMark, { size }),
          ),
        );

        ctx.slots.inject('sidebar.brand.name', () =>
          ctx.slots.register(
            {
              name: 'sidebar.brand.name',
              priority: -1,
            },
            BrandLockup,
          ),
        );

        /* The pit-wall decal sits in the row under the composer. */
        ctx.slots.inject('conversation.composer.dock', () =>
          ctx.slots.register(
            {
              name: 'conversation.composer.dock',
              id: 'f1-pit-strip',
              order: 2,
            },
            PitStrip,
          ),
        );
      },
    };
  },
});
