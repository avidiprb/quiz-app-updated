import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, FlatList, SafeAreaView } from "react-native";

export default function App() {
  const quiz = [
    {
      prompt: "React is framework based on which language",
      type: "multiple-choice",
      choices: [
        { text: "1. C++", id: 1 },
        { text: "2. Agile", id: 2 },
        { text: "3. Java", id: 3 },
        { text: "4. JavaScript++", id: 4 },
        { text: "5. None of these", id: 5 },
      ],
      correct: "5",
    },
    {
      prompt: "Which languages below support array",
      type: "multiple-answer",
      choices: [
        { text: "1. Python", id: 1 },
        { text: "2. Agile", id: 2 },
        { text: "3. Tesla", id: 3 },
        { text: "4. Javascript", id: 4 },
      ],
      correct: "1,4",
    },
    {
      prompt: "React is the only JavaScript framework available",
      type: "true-false",
      choices: [
        { text: "1. true", id: 1 },
        { text: "2. false", id: 2 },
      ],
      correct: "2",
    },
  ];

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [finished, setfinished] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState("");
  //const [seconds, setSeconds] = useState(0);

  /*openAlert=()=>{
    alert('Alert with one button');
  }*/

  /*useEffect(() => {
    let interval =null
    
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
      console.log('seconds='+{seconds})
      return () => clearInterval(interval);
  }, [seconds]); */
  
  

  const onClickNext = () => {
    // again reset the selectedAnwerIndex, so it won't effect next question
    let tempvar = selectedOptions;
    //remove all spaces from tempvar
    tempvar.replace(/\s/g, "");

    if (tempvar === quiz[activeQuestion].correct) {
      setScore((prev) => prev + 1);
    } 

    setActiveQuestion((prev) => prev + 1);
    setfinished(activeQuestion === quiz.length - 1 ? true : false);
    setSelectedOptions("");
  };

  const onClickQuit = () => {
    // again reset the selectedAnwerIndex, so it won't effect next question

    setfinished(true);
  };

  const onClickStartAgain = () => {
    window.location.reload(true)
  };

  const recordResult = (choice) => {
    // again reset the selectedAnwerIndex, so it won't effect next question

    setSelectedOptions(choice);
    console.log(choice);
  };

  /*const Item = ({ text }) => {
    <SafeAreaView style={styles.container}>
      <Text>{text}</Text>
    </SafeAreaView>;
  };*/

  const renderItem = ({item}) => {
    
        console.log(item);
        return (
            <SafeAreaView>
         <Text style={styles.itemNotdone}>{item.text}</Text>
        </SafeAreaView>
        )  
  };

  return (
    <View style={styles.container}>
      <Text>Quiz</Text>
      <View style={styles.container}>
        {finished ? (
        <View>
          <View>
            <Text>
              You scored {score} out of {quiz.length}.
            </Text>
          </View>
          <View>
            <button onClick={onClickStartAgain}>Start Again</button>
          </View>
        </View>
        ) : (
            <SafeAreaView>
                <Text>
                  Question {activeQuestion + 1} of {quiz.length}. Current score
                  is {score}.
                </Text>
                <Text>
                  {quiz[activeQuestion].prompt}-----{quiz[activeQuestion].type}
                </Text> 
                <FlatList
                  data={quiz[activeQuestion].choices}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                />
                 <TextInput
                  placeholder="Type in the #Answer. If multiple , separate by commas :"
                  onChangeText={recordResult}
                />
              <View style={{ flexDirection:"row" }}>
                <View>
                  <button onClick={onClickNext}>Next</button>
                </View>
                <View>
                  <button onClick={onClickQuit}>Quit</button>
                </View>
              </View>
            </SafeAreaView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  itemNotdone: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
   
  }
});

/* On line 123
data={quiz[activeQuestion].choices}*/