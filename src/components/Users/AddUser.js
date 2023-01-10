import React, { Fragment, useState, useRef } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
//import Wrapper from "../Helpers/Wrapper";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  // ref를 사용하므로 useState 사용안한다.
  // Ref는 값만 읽을때 사용하는 것이 좋고, useState는 값을 변경할때 사용하는것이 좋다.
  // const [enteredUsername, setEnteredUseername] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;

    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a vaild name and age (non-empty values).",
      });
      return;
    }
    if (+enteredUserAge < 0) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }
    props.onAddUser(enteredName, enteredUserAge);
    //Ref를 사용하여 입력값 초기화하기
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
    // setEnteredUseername("");
    // setEnteredAge("");
  };
  // const usernameChangeHandler = (event) => {
  //   setEnteredUseername(event.target.value);
  // };
  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };
  const errorHandler = () => {
    setError(null);
  };
  return (
    // div태그로 감싸면 나중엔 div가 많아질수 있고 그러한 이유 때문에 랜더링이 느려질 수 있으므로 Wrapper라는 컴포넌트를 만들어 그 안에는
    // 인접한 태그들을 부르는 props.children 만 리턴해서 div는 줄이고 리액트 조건은 충족시키며 가벼워지게 만들 수 있다.
    // <Wrapper>

    //div 태그나 Wrapper 컴포넌트를 만들어서 감싸는대신 리액트에서 제공하는 Fragment를 사용하는것이 자주 쓰이는 방법이다.
    //<React.Fragment> or 리액트에서 Fragment를 추가한후 <Fragment>만 사용가능하며, <></>로도 가능하다.
    <Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
       {/* 사용자 임의 컴포넌트이므로 Card컴포넌트에 가서 className의 프로퍼티를 설정해야한다. */}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            // value={enteredUsername}
            // onChange={usernameChangeHandler}
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            // value={enteredAge}
            // onChange={ageChangeHandler}
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Fragment>
  );
};

export default AddUser;
