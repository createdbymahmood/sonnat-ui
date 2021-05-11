import React from "react";
import PropTypes from "prop-types";
import createClass from "classnames";
import { ChevronLeft, ChevronRight } from "../../internals/icons";
import makeStyles from "../../styles/makeStyles";
import useTheme from "../../styles/useTheme";

export const componentName = "BreadcrumbItem";

const useStyles = makeStyles(
  theme => {
    const {
      colors,
      direction,
      mixins: { useIconWrapper },
      hacks: { backfaceVisibilityFix },
      typography: { pxToRem, useText }
    } = theme;

    return {
      root: {
        ...useText({
          fontSize: pxToRem(12),
          color: colors.text.secondary
        }),
        display: "inline-flex",
        alignItems: "center",
        flexShrink: "0",
        cursor: "pointer",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        transition: "color 360ms ease",
        ...(direction === "rtl"
          ? { marginLeft: pxToRem(4) }
          : { marginRight: pxToRem(4) }),
        "& > a": { textDecoration: "none", color: "inherit" },
        "&:hover": {
          color: colors.text.primary,
          "& > $separator": {
            color: colors.text.primary,
            transform: "rotate(180deg)"
          },
          "& ~ $root > $separator": {
            transform: "rotate(180deg)"
          }
        }
      },
      separator: {
        ...useIconWrapper(16),
        ...backfaceVisibilityFix,
        color: colors.text.secondary,
        flexShrink: "0",
        transition: "color 360ms ease, transform 360ms ease"
      }
    };
  },
  { name: `Sonnat${componentName}` }
);

const BreadcrumbItem = React.memo(
  React.forwardRef(function BreadcrumbItem(props, ref) {
    const { className, children, ...otherProps } = props;

    const localClass = useStyles();
    const theme = useTheme();

    const isRtl = theme.direction === "rtl";

    return (
      <li
        ref={ref}
        className={createClass(localClass.root, className)}
        {...otherProps}
      >
        {children}
        <i
          className={createClass(
            localClass.separator,
            "sonnat__breadcrumb-item__separator"
          )}
        >
          {isRtl ? <ChevronLeft /> : <ChevronRight />}
        </i>
      </li>
    );
  })
);

BreadcrumbItem.displayName = componentName;

BreadcrumbItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default BreadcrumbItem;
