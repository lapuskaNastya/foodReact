import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export const asStyle = StyleSheet.create({
  container: {
    flex: 1, // Главное пространство для всей страницы
    
  },
  blockHeader: {
    marginTop: 500,
    paddingHorizontal: 70,
    paddingVertical: 10,
    borderColor: 'white',
    borderWidth: 0.5,
    backgroundColor: '#fffff',
    borderRadius: 20,
    
  },
   background: {
    flex: 1, // чтобы ImageBackground занимал весь экран
    resizeMode: 'cover', // растягивание картинки на всю область
    backgroundColor: 'black',

  },
  background1: {
    flex: 1, // чтобы ImageBackground занимал весь экран
    resizeMode: 'cover', // растягивание картинки на всю область
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',

  },
  cub : {
    backgroundColor: 'rgba(74, 74, 74, 0.4)',
    
      marginLeft: 5,
      paddingLeft: 15,
      paddingTop: 100,
      paddingBottom: 20,
      paddingRight: 100,

      justifyContent: 'center',
      alignContent: 'center',
      borderRadius: 20,
      borderColor:'red',
      
  },
  logo: {
    width: 90, // Настройте ширину логотипа
    height: 110, // Настройте высоту логотипа
    position: 'absolute', // Абсолютное позиционирование
    top: 30, // Позиционируем логотип выше блока cub (настраивайте по необходимости)
    left: '50%', // Центрируем по горизонтали
    transform: [{ translateX: -5 }], // Сдвигаем на половину ширины, чтобы логотип был точно по центру
  },

  blockHeader2: {
    marginTop: 10,
    paddingHorizontal: 120,
    paddingVertical: 10,
    borderColor: 'black',
    borderWidth: 0.5,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    
  },
  blockHeaderText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
   
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  blockHeaderText2: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    justifyContent: 'center',
   
  },
  inputView: {
    shadowColor: 'black', 
    shadowOffset: { width: 5, height: 5 }, 
    shadowOpacity: 0.25, 
   shadowRadius: 3, 
   elevation: 5, // Для Android
    borderRadius: 30,
    width: "90%",
    height: 30,
    marginBottom: 20,
    justifyContent : 'center',
  },
  inputRow: {
    flexDirection: 'row', // Чтобы имя и фамилия были рядом
    justifyContent: 'space-between', // Равномерно распределяет пространство
    width: '70%', // Ограничиваем ширину для корректного расположения
    marginBottom: 5,
    alignItems: 'flex-start',
  },
  Texting :{
    color: 'white',
    fontSize: 15,
     // Центрируем текст по горизонтали
   
  },
  TextAc :{
    fontSize: 25,
    color: 'red',
    marginBottom: 30,
    justifyContent: 'center',
    transform: [{ translateX: 60 }],
    fontFamily: '1',

  },

  TextInput: {
    
    backgroundColor: 'transparent',
    height: 90,
    width: "200",
    flex: 1,
    padding: 10,
    marginLeft: 0,
    borderRadius: 10,
    borderWidth: 0.5, // Добавляем обводку
    borderColor: 'white', // Белая обводка
    color: 'rgba(255, 255, 255, 1)', // Белый текст
    textAlign: 'left', // Выравнивание текста
    opacity: 1,
    


  },
  main: {
    flex: 1, // чтобы ImageBackground занимал весь экран
    resizeMode: 'cover', // растягивание картинки на всю область
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 100,
    color: 'white',
    textAlign: 'center',
    

  },
  blockHeaderRegister: {
    
    
    paddingVertical: 10,
    width: 250,
    borderWidth: 0.5,
    backgroundColor: '#fe1212',
    borderRadius: 10,
    transform: [{ translateX: 40 }],
    
  },
  blockHeaderTextRegister: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    justifyContent: 'center',
   
  },
  

});

