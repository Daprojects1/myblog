import useStyles from "../utils/useStyles";

const NavList = ({
  isDesktop,
  list,
  listClasses,
  handleChangeNav,
  checked,
  currentNav,
}) => {
  const { borderBottom } = useStyles();

  const mobileStyles = (item) => {
    return {
      borderBottom: borderBottom,
      color: currentNav === item ? "rgb(79, 75, 172)" : "",
    };
  };

  const desktopStyles = (item) => {
    return {
      textDecorationLine: currentNav === item ? "underline" : "none",
      textDecorationColor: "rgb(79, 75, 172)",
      textUnderlineOffset: "5px",
      textDecorationThickness: "3px",
    };
  };

  return (
    <ul className={listClasses}>
      {list?.map((item, indx) => (
        <li
          style={
            isDesktop ? desktopStyles(item?.name) : mobileStyles(item?.name)
          }
          key={indx}
          onClick={() => handleChangeNav(item?.name, item?.path)}>
          {item?.name}
        </li>
      ))}
    </ul>
  );
};

export default NavList;
