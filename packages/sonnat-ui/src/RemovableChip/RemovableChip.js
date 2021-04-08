import React from "react";
import PropTypes from "prop-types";
import createClass from "classnames";
import Icon from "../Icon";
import makeStyles from "../styles/makeStyles";
import { changeColor } from "../styles/colorUtils";

const componentName = "RemovableChip";
const allowedVariants = ["filled", "outlined"];
const allowedSizes = ["medium", "small"];
const allowedColors = ["default", "primary", "secondary"];

const camelCase = s => s.replace(/-./g, x => x.toUpperCase()[1]);

const useStyles = makeStyles(
  theme => {
    const {
      colors,
      darkMode,
      direction,
      mixins: { useFontIconSize, useDisableUserSelect },
      typography: { pxToRem, useText, fontFamily }
    } = theme;

    const filledPrimaryMainBg = !darkMode
      ? colors.primary.origin
      : colors.primary.light;
    const filledSecondaryMainBg = !darkMode
      ? colors.secondary.origin
      : colors.secondary.light;

    const filledPrimary = {
      background: filledPrimaryMainBg,
      text: colors.getContrastColorOf(filledPrimaryMainBg)
    };

    const filledSecondary = {
      background: filledSecondaryMainBg,
      text: colors.getContrastColorOf(filledSecondaryMainBg)
    };

    return {
      root: {
        ...useText(),
        ...useDisableUserSelect(),
        direction,
        fontFamily: fontFamily[direction],
        padding: `0 ${pxToRem(12)}`,
        outline: "none",
        display: "inline-flex",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: pxToRem(2),
        verticalAlign: "middle",
        overflow: "hidden",
        position: "relative",
        zIndex: "1",
        flexShrink: "0",
        transition:
          "color 360ms ease, background-color 360ms ease, border 360ms ease"
      },
      icon: {
        ...useFontIconSize(16),
        flexShrink: "0",
        transition: "color 360ms ease"
      },
      removeButton: {
        padding: "0",
        margin: "0",
        outline: "none",
        cursor: "pointer",
        borderRadius: "0",
        border: "none",
        minWidth: "auto",
        height: "100%",
        backgroundColor: colors.transparent,
        zIndex: "2",
        pointerEvents: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexShrink: "0",
        ...(direction === "rtl"
          ? { marginLeft: pxToRem(-12), marginRight: "auto" }
          : { marginRight: pxToRem(-12), marginLeft: "auto" })
      },
      removeButtonIcon: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.transparent,
        borderRadius: "50%",
        cursor: "pointer",
        width: pxToRem(16),
        height: pxToRem(16),
        minWidth: pxToRem(16),
        minHeight: pxToRem(16),
        fontSize: pxToRem(16),
        transition: "background-color 360ms ease, color 360ms ease",
        "&:hover, &:focus": {
          backgroundColor: !darkMode
            ? colors.createBlackColor({ alpha: 0.12 })
            : colors.createWhiteColor({ alpha: 0.12 })
        },
        "&:active": {
          backgroundColor: !darkMode
            ? colors.createBlackColor({ alpha: 0.24 })
            : colors.createWhiteColor({ alpha: 0.24 })
        },
        "&:hover": {
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: colors.transparent
          }
        }
      },
      small: {
        height: pxToRem(28),
        fontSize: pxToRem(12),
        "& $removeButton": { width: pxToRem(28) },
        "& $icon": {
          ...(direction === "rtl"
            ? { marginRight: pxToRem(-6), marginLeft: pxToRem(4) }
            : { marginLeft: pxToRem(-6), marginRight: pxToRem(4) })
        }
      },
      medium: {
        height: pxToRem(32),
        fontSize: pxToRem(14),
        "& $removeButton": { width: pxToRem(32) },
        "& $icon": {
          ...(direction === "rtl"
            ? { marginRight: pxToRem(-4), marginLeft: pxToRem(4) }
            : { marginLeft: pxToRem(-4), marginRight: pxToRem(4) })
        }
      },
      rounded: {
        borderRadius: pxToRem(16)
      },
      disabled: {
        pointerEvents: "none",
        "& $removeButton": { pointerEvents: "none" },
        "& $icon, & $removeButtonIcon": { pointerEvents: "none" },
        "&:hover": {
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: colors.transparent
          }
        }
      },
      filled: {
        "&$disabled": {
          backgroundColor: !darkMode
            ? colors.pallete.grey[100]
            : colors.pallete.grey[900],
          color: !darkMode
            ? colors.createBlackColor({ alpha: 0.32 })
            : colors.createWhiteColor({ alpha: 0.12 }),
          "& $icon, & $removeButtonIcon": {
            color: !darkMode
              ? colors.createBlackColor({ alpha: 0.32 })
              : colors.createWhiteColor({ alpha: 0.12 })
          }
        }
      },
      outlined: {
        "&$disabled": {
          backgroundColor: colors.transparent
        }
      },
      filledDefault: {
        backgroundColor: !darkMode
          ? colors.createBlackColor({ alpha: 0.04 })
          : colors.createWhiteColor({ alpha: 0.04 }),
        color: colors.text.secondary,
        "& $icon, & $removeButtonIcon": { color: colors.text.secondary }
      },
      filledPrimary: {
        backgroundColor: filledPrimary.background,
        color: filledPrimary.text,
        "& $icon, & $removeButtonIcon": {
          color: filledPrimary.text
        }
      },
      filledSecondary: {
        backgroundColor: filledSecondary.background,
        color: filledSecondary.text,
        "& $icon, & $removeButtonIcon": {
          color: filledSecondary.text
        }
      },
      outlinedDefault: {
        backgroundColor: !darkMode
          ? colors.createBlackColor({ alpha: 0.04 })
          : colors.createWhiteColor({ alpha: 0.04 }),
        border: `${pxToRem(1)} solid ${colors.divider}`,
        color: colors.text.secondary,
        "& $icon, & $removeButtonIcon": { color: colors.text.secondary },
        "&$disabled, &[disabled]": {
          borderColor: colors.divider,
          color: colors.text.disabled,
          "& $icon, & $removeButtonIcon": { color: colors.text.disabled }
        }
      },
      outlinedPrimary: {
        backgroundColor: !darkMode
          ? colors.createPrimaryColor({ alpha: 0.04 })
          : changeColor(colors.primary.light, { alpha: 0.04 }),
        border: `${pxToRem(1)} solid ${
          !darkMode ? colors.primary.origin : colors.primary.light
        }`,
        color: !darkMode ? colors.primary.origin : colors.primary.light,
        "& $icon, & $removeButtonIcon": {
          color: !darkMode ? colors.primary.origin : colors.primary.light
        },
        "& $removeButtonIcon": {
          "&:hover, &:focus": {
            backgroundColor: !darkMode
              ? colors.createPrimaryColor({ alpha: 0.12 })
              : changeColor(colors.primary.light, { alpha: 0.12 })
          },
          "&:active": {
            backgroundColor: !darkMode
              ? colors.createPrimaryColor({ alpha: 0.24 })
              : changeColor(colors.primary.light, { alpha: 0.24 })
          },
          "&:hover": {
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
              backgroundColor: colors.transparent
            }
          }
        },
        "&$disabled": {
          color: !darkMode
            ? colors.createPrimaryColor({ alpha: 0.32 })
            : changeColor(colors.primary.light, { alpha: 0.32 }),
          "& $icon, & $removeButtonIcon": {
            color: !darkMode
              ? colors.createPrimaryColor({ alpha: 0.32 })
              : changeColor(colors.primary.light, { alpha: 0.32 })
          },
          borderColor: !darkMode
            ? colors.createPrimaryColor({ alpha: 0.12 })
            : changeColor(colors.primary.light, { alpha: 0.12 })
        }
      },
      outlinedSecondary: {
        backgroundColor: !darkMode
          ? colors.createSecondaryColor({ alpha: 0.04 })
          : changeColor(colors.secondary.light, { alpha: 0.04 }),
        border: `${pxToRem(1)} solid ${
          !darkMode ? colors.secondary.origin : colors.secondary.light
        }`,
        color: !darkMode ? colors.secondary.origin : colors.secondary.light,
        "& $icon, & $removeButtonIcon": {
          color: !darkMode ? colors.secondary.origin : colors.secondary.light
        },
        "& $removeButtonIcon": {
          "&:hover, &:focus": {
            backgroundColor: !darkMode
              ? colors.createSecondaryColor({ alpha: 0.12 })
              : changeColor(colors.secondary.light, { alpha: 0.12 })
          },
          "&:active": {
            backgroundColor: !darkMode
              ? colors.createSecondaryColor({ alpha: 0.24 })
              : changeColor(colors.secondary.light, { alpha: 0.24 })
          },
          "&:hover": {
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
              backgroundColor: colors.transparent
            }
          }
        },
        "&$disabled": {
          color: !darkMode
            ? colors.createSecondaryColor({ alpha: 0.32 })
            : changeColor(colors.secondary.light, { alpha: 0.32 }),
          "& $icon, & $removeButtonIcon": {
            color: !darkMode
              ? colors.createSecondaryColor({ alpha: 0.32 })
              : changeColor(colors.secondary.light, { alpha: 0.32 })
          },
          borderColor: !darkMode
            ? colors.createSecondaryColor({ alpha: 0.12 })
            : changeColor(colors.secondary.light, { alpha: 0.12 })
        }
      }
    };
  },
  { name: `Sonnat${componentName}` }
);

const RemovableChip = React.memo(
  React.forwardRef(function RemovableChip(props, ref) {
    const {
      className,
      label,
      onRemove,
      leadingIcon,
      rounded = false,
      disabled = false,
      variant = "filled",
      color = "default",
      size = "medium",
      ...otherProps
    } = props;

    const localClass = useStyles();

    const hasValidVariant = allowedVariants.includes(variant);
    const hasValidColor = allowedColors.includes(color);
    const hasValidSize = allowedSizes.includes(size);

    const removeHandler = e => {
      if (!disabled && onRemove) onRemove(e);
    };

    return label ? (
      <div
        aria-disabled={disabled ? "true" : "false"}
        ref={ref}
        className={createClass(localClass.root, className, {
          [localClass[size]]: hasValidSize,
          [localClass[variant]]: hasValidVariant,
          [localClass[camelCase(`${variant}-${color}`)]]:
            hasValidColor && hasValidVariant,
          [localClass.rounded]: rounded,
          [localClass.disabled]: disabled
        })}
        {...otherProps}
      >
        {leadingIcon && (
          <Icon
            identifier={leadingIcon}
            className={createClass(localClass.icon)}
          />
        )}
        {label}
        <button
          className={localClass.removeButton}
          onClick={removeHandler}
          disabled={disabled}
          tabIndex={disabled ? -1 : 0}
        >
          <Icon
            identifier="close"
            className={createClass(localClass.removeButtonIcon)}
          />
        </button>
      </div>
    ) : null;
  })
);

RemovableChip.displayName = componentName;

RemovableChip.propTypes = {
  label: PropTypes.string.isRequired,
  leadingIcon: PropTypes.string,
  className: PropTypes.string,
  rounded: PropTypes.bool,
  disabled: PropTypes.bool,
  onRemove: PropTypes.func,
  color: PropTypes.oneOf(allowedColors),
  variant: PropTypes.oneOf(allowedVariants),
  size: PropTypes.oneOf(allowedSizes)
};

export default RemovableChip;
