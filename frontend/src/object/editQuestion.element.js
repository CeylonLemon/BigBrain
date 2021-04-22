import styled from 'styled-components';
import { Container } from '@material-ui/core';

export const Contain = styled(Container)`
  border: grey solid;
  border-radius: 20px;
  margin-left: 0;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 600px;
`

export const Wrapper = styled(Contain)`
 justify-content: flex-start;
`
export const QNavigator = styled(Container)`
  
  height: 30px;
  width: 280px;
  margin-top: 10px;
  background-color: lightblue;
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  border-bottom: 0;
`

export const Buttons = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
`
export const EditGamesContainer = styled(Container)`
  height: 800px;
  width: 500px;
  margin-top: 100px;
  margin-left: 30%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`
export const QuestionEditor = styled(Container)`
  height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
export const Options = styled(Container)`
  height: 150px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  border: lightblue solid 1px;
  border-radius: 10px;
  overflow: scroll;
`
export const Option = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 10px;
`
