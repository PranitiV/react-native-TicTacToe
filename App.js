import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Pressable, Alert, Text, TouchableOpacity } from 'react-native';
import bg from './assets/bg.jpeg'
import styles from './styles'


export default function App() {
  const [map, setMap] = useState([
    ['', '', '',],
    ['', '', '',],
    ['', '', '',]
  ])
  const [turn, setTurn] = useState("x")
  const [level, setLevel] = useState(-1)
  const [gameIsOver, setGameOver] = useState(false)

  const onPress = (rowIndex, columnIndex) => {
    if (map[rowIndex][columnIndex] !== '') {
      Alert.alert('Occupied!', 'Please choose another cell');
      return;
    }
    setMap((existingMap) => {
      const newMap = [...existingMap]
      newMap[rowIndex][columnIndex] = turn
      return newMap;
    })
    turn === "x" ? setTurn("o") : setTurn("x")
  }

  useEffect(() => {
    //Check rows 
    for (let i = 0; i < 3; i++) {
      if (map[i][0] === map[i][1] && map[i][1] === map[i][2] && map[i][1] !== "") {
        gameOver(map[i][0])
        setGameOver(true)
        return;
      }
    }
    //Check columns 
    for (let i = 0; i < 3; i++) {
      if (map[0][i] === map[1][i] && map[1][i] === map[2][i] && map[1][i] !== "") {
        gameOver(map[0][i])
        setGameOver(true)
        return;
      }
    }
    //Check diagonals 
    if (map[0][0] === map[1][1] && map[1][1] === map[2][2] && map[1][1] !== "") {
      gameOver(map[0][0]);
      setGameOver(true)
      return;
    }
    if (map[0][2] === map[1][1] && map[0][2] === map[2][0] && map[0][2] !== "") {
      gameOver(map[0][2])
      setGameOver(true)
      return;
    }

    //Checking for tie
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (map[i][j] === '') {
          return;
        }
      }
    }
    gameOver('Tie')
    setGameOver(true)

  }, [map])

  const resetGame = () => {
    setMap([
      ['', '', '',],
      ['', '', '',],
      ['', '', '',]
    ]);
    setTurn('x');
    setGameOver(false)
  }

  const gameOver = (player) => {
    (player !== 'Tie') ?
      (Alert.alert('Congratulations!!', `Player ${player.toUpperCase()} won`, [{
        text: "Restart",
        onPress: resetGame
      }])) : (Alert.alert('It\'s a Tie!!', '', [{
        text: "Restart",
        onPress: resetGame
      }]))
  }

  useEffect(() => {
    turn === 'o' && level !== -1 && !gameIsOver ? botTurn() : null
  }, [turn, gameIsOver])

  const botTurn = () => {
    if (!gameIsOver) {
      const possiblePositions = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (map[i][j] === '') {
            possiblePositions.push({ row: i, column: j });
          }
        }
      }
      let flag = 0;
      if (level === 1) {
        for (let k = 0; k < possiblePositions.length; k++) {
          if (defendingBot(possiblePositions[k]) && flag === 0) {
            console.log('entered here')
            onPress(possiblePositions[k].row, possiblePositions[k].column)
            flag = 1;
          }
        }
      }
      if (flag === 0) {
        console.log('choosing random')
        const chosen = possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
        if (chosen) { onPress(chosen.row, chosen.column) }
      }
    }
  }

  const defendingBot = ({ row, column }) => {
    console.log('entered defending bot')
    console.log('row--->', row, 'column--->', column)
    if (row === 0) {
      console.log('here row 0')
      if (column === 0) {
        if (map[0][1] === map[0][2] && map[0][2] !== '') return true
        if (map[1][0] === map[2][0] && map[2][0] !== '') return true
        if (map[1][1] === map[2][2] && map[2][2] !== '') return true
      } else if (column === 1) {
        if (map[0][0] === map[0][2] && map[0][2] !== '') return true
        if (map[1][1] === map[2][1] && map[1][1] !== '') return true
      } else if (column === 2) {
        if (map[0][0] === map[0][1] && map[0][0] !== '') return true
        if (map[1][2] === map[2][2] && map[2][2] !== '') return true
        if (map[1][1] === map[2][0] && map[1][1] !== '') return true
      }
    } else if (row === 1) {
      console.log('here row 1')
      if (column === 0) {
        if (map[1][1] === map[1][2] && map[1][1] !== '') return true
        if (map[0][0] === map[2][0] && map[2][0] !== '') return true
      } else if (column === 1) {
        if (map[0][1] === map[2][1] && map[0][1] !== '') return true
        if (map[1][0] === map[1][2] && map[1][0] !== '') return true
        if (map[0][0] === map[2][2] && map[0][0] !== '') return true
        if (map[0][2] === map[2][0] && map[0][2] !== '') return true
      } else if (column === 2) {
        if (map[0][2] === map[2][2] && map[0][2] !== '') return true
        if (map[1][0] === map[1][1] && map[1][1] !== '') return true
      }
    } else if (row === 2) {
      console.log('here row 2')
      if (column === 0) {
        if (map[2][1] === map[2][2] && map[2][2] !== '') return true
        if (map[0][0] === map[1][0] && map[0][0] !== '') return true
        if (map[0][2] === map[1][1] && map[0][2] !== '') return true
      } else if (column === 1) {
        if (map[0][1] === map[1][1] && map[1][1] !== '') return true
        if (map[2][0] === map[2][2] && map[2][0] !== '') return true
      } else if (column === 2) {
        if (map[2][1] === map[2][0] && map[2][0] !== '') return true
        if (map[1][2] === map[0][2] && map[0][2] !== '') return true
        if (map[0][0] === map[1][1] && map[0][0] !== '') return true
      }
    }
    return false
  }

  const onPressButton = (p) => {
    setLevel(p)
    resetGame()
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} resizeMode='contain'>
        {level === -1? (<Text style={styles.turnText}>Current turn: {turn.toUpperCase()} </Text>):null}
        <View style={styles.map}>
          {map.map((row, rowIndex) => (
            <View style={styles.row}>
              {row.map((cell, columnIndex) =>
                <Pressable style={styles.cell} onPress={() => onPress(rowIndex, columnIndex)}>
                  {cell === 'o' && (
                    <View style={styles.circle} />
                  )}
                  {cell === 'x' && (
                    <View style={styles.cross}>
                      <View style={styles.crossLine} />
                      <View style={[styles.crossLine, styles.crossLineRev]} />
                    </View>
                  )}
                </Pressable>
              )}
            </View>
          ))}
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={level === -1 ? [styles.eachButton, styles.eachButtonSelected] : styles.eachButton} onPress={() => onPressButton(-1)}>
            <Text style={styles.eachButtonText}>
              2-Player
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={level === 0 ? [styles.eachButton, styles.eachButtonSelected] : styles.eachButton} onPress={() => onPressButton(0)}>
            <Text style={styles.eachButtonText}>
              Easy Bot
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={level === 1 ? [styles.eachButton, styles.eachButtonSelected] : styles.eachButton} onPress={() => onPressButton(1)}>
            <Text style={styles.eachButtonText}>
              Medium Bot
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

