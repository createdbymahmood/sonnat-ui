import createClass from "classnames";
import PropTypes from "prop-types";
import React from "react";
import Close from "../internals/icons/Close";
import { changeColor } from "../styles/colorUtils";
import makeStyles from "../styles/makeStyles";

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
      mixins: { useIconWrapper, useDisableUserSelect },
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
        ...useIconWrapper(16),
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
        "& $icon, & $removeButtonIcon": { color: colors.text.secondary },
        "&$disabled": {
          backgroundColor: !darkMode
            ? colors.pallete.grey[100]
            : colors.pallete.grey[900]
        }
      },
      filledPrimary: {
        backgroundColor: filledPrimary.background,
        color: filledPrimary.text,
        "& $icon, & $removeButtonIcon": { color: filledPrimary.text },
        "&$disabled": {
          backgroundColor: changeColor(filledPrimaryMainBg, { alpha: 0.12 })
        }
      },
      filledSecondary: {
        backgroundColor: filledSecondary.background,
        color: filledSecondary.text,
        "& $icon, & $removeButtonIcon": { color: filledSecondary.text },
        "&$disabled": {
          backgroundColor: changeColor(filledSecondaryMainBg, { alpha: 0.12 })
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
        backgroundColor: changeColor(filledPrimaryMainBg, { alpha: 0.04 }),
        border: `${pxToRem(1)} solid ${filledPrimaryMainBg}`,
        color: filledPrimaryMainBg,
        "& $icon, & $removeButtonIcon": { color: filledPrimaryMainBg },
        "& $removeButtonIcon": {
          "&:hover, &:focus": {
            backgroundColor: changeColor(filledPrimaryMainBg, { alpha: 0.12 })
          },
          "&:active": {
            backgroundColor: changeColor(filledPrimaryMainBg, { alpha: 0.24 })
          },
          "&:hover": {
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
              backgroundColor: colors.transparent
            }
          }
        },
        "&$disabled": {
          color: changeColor(filledPrimaryMainBg, { alpha: 0.32 }),
          "& $icon, & $removeButtonIcon": {
            color: changeColor(filledPrimaryMainBg, { alpha: 0.32 })
          },
          borderColor: changeColor(filledPrimaryMainBg, { alpha: 0.32 })
        }
      },
      outlinedSecondary: {
        backgroundColor: changeColor(filledSecondaryMainBg, { alpha: 0.04 }),
        border: `${pxToRem(1)} solid ${filledSecondaryMainBg}`,
        color: filledSecondaryMainBg,
        "& $icon, & $removeButtonIcon": {
          color: filledSecondaryMainBg
        },
        "& $removeButtonIcon": {
          "&:hover, &:focus": {
            backgroundColor: changeColor(filledSecondaryMainBg, { alpha: 0.12 })
          },
          "&:active": {
            backgroundColor: changeColor(filledSecondaryMainBg, { alpha: 0.24 })
          },
          "&:hover": {
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
              backgroundColor: colors.transparent
            }
          }
        },
        "&$disabled": {
          color: changeColor(filledSecondaryMainBg, { alpha: 0.32 }),
          "& $icon, & $removeButtonIcon": {
            color: changeColor(filledSecondaryMainBg, { alpha: 0.32 })
          },
          borderColor: changeColor(filledSecondaryMainBg, { alpha: 0.12 })
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
          <i className={createClass(localClass.icon)}>{leadingIcon}</i>
        )}
        {label}
        <button
          className={localClass.removeButton}
          onClick={removeHandler}
          disabled={disabled}
          tabIndex={disabled ? -1 : 0}
        >
          <i className={createClass(localClass.removeButtonIcon)}>
            <Close />
          </i>
        </button>
      </div>
    ) : null;
  })
);

RemovableChip.displayName = componentName;

RemovableChip.propTypes = {
  label: PropTypes.string.isRequired,
  leadingIcon: PropTypes.node,
  className: PropTypes.string,
  rounded: PropTypes.bool,
  disabled: PropTypes.bool,
  onRemove: PropTypes.func,
  color: PropTypes.oneOf(allowedColors),
  variant: PropTypes.oneOf(allowedVariants),
  size: PropTypes.oneOf(allowedSizes)
};

export default RemovableChip;
