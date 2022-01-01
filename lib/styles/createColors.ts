import Color from "color";
import {
  calculateContrastRatio,
  changeColorHsla,
  darken,
  lighten,
  opaquify as _opaquify,
  type ColorInputType,
  type HslaInputType
} from "./colorUtils";
import { blue, green, grey, navy, orange, pink, red } from "./swatches";

export type BackgroundColorType = {
  origin: string;
  level: { 1: string; 2: string };
};

export type TextColorType = {
  primary: string;
  secondary: string;
  disabled: string;
  hint: string;
};

export type ColorVariant = {
  origin: string;
  light: string;
  dark: string;
};

export interface Colors {
  primary: ColorVariant;
  secondary: ColorVariant;
  error: ColorVariant;
  warning: ColorVariant;
  info: ColorVariant;
  success: ColorVariant;
  transparent: string;
  contrastThreshold: number;
  text: TextColorType;
  divider: string;
  white: string;
  black: string;
  background: BackgroundColorType;
  createPrimaryColor: (hsla: HslaInputType, opaquify?: boolean) => string;
  createSecondaryColor: (hsla: HslaInputType, opaquify?: boolean) => string;
  createBlackColor: (hsla: HslaInputType, opaquify?: boolean) => string;
  createWhiteColor: (hsla: HslaInputType, opaquify?: boolean) => string;
  createErrorColor: (hsla: HslaInputType, opaquify?: boolean) => string;
  createWarningColor: (hsla: HslaInputType, opaquify?: boolean) => string;
  createSuccessColor: (hsla: HslaInputType, opaquify?: boolean) => string;
  createInfoColor: (hsla: HslaInputType, opaquify?: boolean) => string;
  getContrastColorOf: (background: ColorInputType) => string;
}

export interface ColorsInput {
  primary?: Colors["primary"] | string;
  secondary?: Colors["secondary"] | string;
  error?: Colors["error"] | string;
  warning?: Colors["warning"] | string;
  info?: Colors["info"] | string;
  success?: Colors["success"] | string;
  contrastThreshold?: number;
}

const contrastThreshold = 3;

const white = "#ffffff" as const;
const black = "#000000" as const;

export const dark = {
  text: {
    primary: white,
    secondary: "#adadad",
    hint: "#525252",
    disabled: "#3d3d3d"
  },
  divider: "#292929",
  background: {
    origin: "#121212",
    level: { 1: "#242424", 2: "#1B1B1B" }
  }
} as const;

export const light = {
  text: {
    primary: "#212121",
    secondary: "#707070",
    hint: "#adadad",
    disabled: "#c2c2c2"
  },
  divider: "#e0e0e0",
  background: {
    origin: "#ffffff",
    level: { 1: grey[50], 2: grey[100] }
  }
} as const;

const defaultSystemColors = {
  primary: {
    light: pink[500],
    origin: pink[600],
    dark: pink[700]
  },
  secondary: {
    light: navy[500],
    origin: navy[600],
    dark: navy[700]
  },
  error: {
    light: red[500],
    origin: red[600],
    dark: red[700]
  },
  warning: {
    light: orange[500],
    origin: orange[600],
    dark: orange[700]
  },
  info: {
    light: blue[600],
    origin: blue[700],
    dark: blue[800]
  },
  success: {
    light: green[700],
    origin: green[800],
    dark: green[900]
  }
} as const;

const createLightVariant = (originColor: ColorInputType) =>
  lighten(originColor, 0.2);

const createDarkVariant = (originColor: ColorInputType) =>
  darken(originColor, 0.2);

const completeSystemColor = (variantInput: string | ColorVariant) => {
  const pairing: ColorVariant = { origin: "", light: "", dark: "" };

  if (typeof variantInput === "string") {
    pairing.origin = variantInput;
    pairing.light = createLightVariant(variantInput);
    pairing.dark = createDarkVariant(variantInput);
  } else if (typeof variantInput === "object") {
    const { origin, light, dark } = variantInput;

    if (!origin || !light || !dark) {
      throw new Error(
        "`color.origin` should be provided along with `color.light` and `color.dark`."
      );
    }

    if (typeof origin !== "string") {
      throw new Error("`color.origin` should be a string!");
    }

    if (typeof light !== "string") {
      throw new Error("`color.light` should be a string!");
    }

    if (typeof dark !== "string") {
      throw new Error("`color.dark` should be a string!");
    }

    pairing.origin = origin;
    pairing.light = light;
    pairing.dark = dark;
  } else {
    throw new Error(
      [
        "[Sonnat]: The color object passed to the `theme` is invalid!",
        "The colors can either be a `string` (representing the origin) or an `object` with `origin`, `light` and `dark` properties."
      ].join("\n")
    );
  }

  return pairing;
};

const createColors = (
  colorsInput?: ColorsInput,
  isDarkMode?: boolean
): Colors => {
  const {
    primary: primaryInput = defaultSystemColors.primary,
    secondary: secondaryInput = defaultSystemColors.secondary,
    error: errorInput = defaultSystemColors.error,
    warning: warningInput = defaultSystemColors.warning,
    info: infoInput = defaultSystemColors.info,
    success: successInput = defaultSystemColors.success,
    contrastThreshold: contrastThresholdInput = contrastThreshold
  } = colorsInput || {};

  const isDark = isDarkMode;

  const transparent = Color.rgb([255, 255, 255]).alpha(0).toString();

  const primary = completeSystemColor(primaryInput);
  const secondary = completeSystemColor(secondaryInput);
  const error = completeSystemColor(errorInput);
  const warning = completeSystemColor(warningInput);
  const info = completeSystemColor(infoInput);
  const success = completeSystemColor(successInput);

  const createBlackColor = (change: HslaInputType, opaquify = false) => {
    const color = changeColorHsla(black, change);

    return opaquify
      ? _opaquify(
          color,
          isDark ? dark.background.origin : light.background.origin
        )
      : color;
  };
  const createWhiteColor = (change: HslaInputType, opaquify = false) => {
    const color = changeColorHsla(white, change);

    return opaquify
      ? _opaquify(
          color,
          isDark ? dark.background.origin : light.background.origin
        )
      : color;
  };

  const createPrimaryColor = (change: HslaInputType, opaquify = false) => {
    const color = changeColorHsla(
      !isDark ? primary.origin : primary.light,
      change
    );

    return opaquify
      ? _opaquify(
          color,
          isDark ? dark.background.origin : light.background.origin
        )
      : color;
  };

  const createSecondaryColor = (change: HslaInputType, opaquify = false) => {
    const color = changeColorHsla(
      !isDark ? secondary.origin : secondary.light,
      change
    );

    return opaquify
      ? _opaquify(
          color,
          isDark ? dark.background.origin : light.background.origin
        )
      : color;
  };

  const createErrorColor = (change: HslaInputType, opaquify = false) => {
    const color = changeColorHsla(!isDark ? error.origin : error.light, change);

    return opaquify
      ? _opaquify(
          color,
          isDark ? dark.background.origin : light.background.origin
        )
      : color;
  };

  const createSuccessColor = (change: HslaInputType, opaquify = false) => {
    const color = changeColorHsla(
      !isDark ? success.origin : success.light,
      change
    );

    return opaquify
      ? _opaquify(
          color,
          isDark ? dark.background.origin : light.background.origin
        )
      : color;
  };

  const createWarningColor = (change: HslaInputType, opaquify = false) => {
    const color = changeColorHsla(
      !isDark ? warning.origin : warning.light,
      change
    );

    return opaquify
      ? _opaquify(
          color,
          isDark ? dark.background.origin : light.background.origin
        )
      : color;
  };

  const createInfoColor = (change: HslaInputType, opaquify = false) => {
    const color = changeColorHsla(!isDark ? info.origin : info.light, change);

    return opaquify
      ? _opaquify(
          color,
          isDark ? dark.background.origin : light.background.origin
        )
      : color;
  };

  const getContrastColorOf = (background: ColorInputType) => {
    const contrastForeground =
      calculateContrastRatio(background, dark.text.primary) >=
      contrastThresholdInput
        ? dark.text.primary
        : light.text.primary;

    if (process.env.NODE_ENV !== "production") {
      const contrast = calculateContrastRatio(background, contrastForeground);

      if (contrast < 3) {
        // eslint-disable-next-line no-console
        console.error(
          [
            `Sonnat: The contrast ratio of ${contrast}:1 for ${contrastForeground} on ${
              background as string
            }`,
            "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.",
            "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"
          ].join("\n")
        );
      }
    }

    return contrastForeground;
  };

  return {
    primary,
    secondary,
    error,
    warning,
    info,
    success,
    transparent,
    white,
    black,
    contrastThreshold: contrastThresholdInput,
    createErrorColor,
    createSuccessColor,
    createWarningColor,
    createInfoColor,
    createPrimaryColor,
    createBlackColor,
    createSecondaryColor,
    createWhiteColor,
    getContrastColorOf,
    ...(isDark ? dark : light)
  };
};

export default createColors;
