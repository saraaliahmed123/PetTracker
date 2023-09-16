//rface

import React from 'react'
import { Text } from 'react-native'
import { useUserContext } from '../../context/UserContext'

const Home = () => {

  const {currentUser} = useUserContext()

  return (
    <View>

      <View>
        <Text>Good monring, {currentUser.providerData[0].displayName}</Text>
      </View>

      <View>
        <View>
          <Text>Your pets</Text>
        </View>
        <View>
          {/* pets displayed */}
        </View>
      </View>

      <View>
        <View>
          <Text>Recent records</Text>
        </View>

        <View>
          <View>
            {/* Animals */}
          </View>
          <View>
            {/* Record Types */}
          </View>
        </View>

        <View>
          {/* Records */}
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