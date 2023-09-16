//rface

import React from 'react'
import { Text } from 'react-native'
import { useUserContext } from '../../context/UserContext'
import { useAnimalContext } from '../../context/AnimalContext'
import { useRecordContext } from '../../context/RecordContext'
import { TouchableOpacity } from 'react-native'

const Home = () => {

  const {currentUser} = useUserContext()
  const {getAnimalsByUserId} = useAnimalContext();
  const {getRecordTypes, getRecentRecords, editChecked} = useRecordContext()

  const [animals, setAnimals] = useState()
  const [recordTypes, setRecordTypes] = useState()
  const {records, setRecords} = useState()

  const time = format(new Date(), 'a')

  useEffect(() => {
    const sub = () => {
      getAnimalsByUserId().then(records => {
        setAnimals(records)
      })

      getRecordTypes().then(records => {
        setRecordTypes(records)
      })

      getRecentRecords().then(records => {
        setRecords(records)
        const checked = []
        records.map((item, key) => {
          checked.push(item.checked)
        })
        setCheckedState(checked)
      })
    }
    sub()
    
  }, [animals])

  const getAnimalsImages = () => {
    if (animals){
      return animals.map((item, key) => {
        return(
          <TouchableOpacity key={key}>
            {/* Images */}
          </TouchableOpacity>
        )
      })
    }
    else{
      //no animals image
    }

  }

  const getDropDown = (items) => {
    if (items){
      // animal/records drop down
    }
    else{
      //no animals/records drop down
    }
  }
  

  const recentRecords = () => {
    if (records){
      return records.map((item, key) => {
        return(
          <View style={styles.record} key={key}>
            <View>
              <Checkbox
                style={styles.colourCheck}
                value={checkedState[key]}
                onValueChange={() => handleOnChange(key)}
                color={checkedState[key] ? '#8DADFF' : '#4E72CE'}
              />
            </View>
            <View style={checkedState[key] ? styles.textBoxN : styles.textBox}
            >
              <Text style={styles.text}>{item.animal[0].name} - {item.typeId}</Text>
              <Text style={styles.text}>{item.date.toDateString()}</Text>
            </View>
          </View>
        )
      })
    }
    else{
      //no records
    }
  }

  const handleOnChange = (position) => {
    console.log(position+"SUP")
    const updatedCheckedState = checkedState.map((item, index) =>
      {
       return index === position ? !item : item
      }
    );
  
    setCheckedState(updatedCheckedState);
  
    console.log(updatedCheckedState+"HEREEEEE")
    editChecked(records[position].id, updatedCheckedState[position]).then(() => {
  
     })
  }

  return (
    <View>

      <View>
        <Text>{time === "PM" ? "Good afternoon," : "Good morning,"} {currentUser.providerData[0].displayName}</Text>
      </View>

      <View>
        <View>
          <Text>Your pets</Text>
        </View>
        <View>
          {
            getAnimalsImages()
          }
        </View>
      </View>

      <View>
        <View>
          <Text>Recent records</Text>
        </View>

        <View>
          <View>
            {
              getDropDown(animals)
            }
          </View>
          <View>
            {
              getDropDown(recordTypes)
            }
          </View>
        </View>

        <View>
          {
            recentRecords()
          }
        </View>
      </View>

      {/* <View>
        <View>
          <Text>{/* Month  </Text>
        </View>
        <View>
          {/* Graph 
        </View>
      </View> */}

    </View>
  )
}

export default Home