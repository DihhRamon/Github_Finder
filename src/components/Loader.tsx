import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={classes.loadingContainer}>
    <div className={classes.container}>
        <div className={classes.ring}></div>
        <div className={classes.ring}></div>
        <div className={classes.ring}></div>
    </div>
    <span className={classes.loader}>Loading...</span>
</div>
  );
};

export default Loader