import React from 'react'
import { StyleSheet, Text, TextInput, Alert } from 'react-native'
import { Controller } from 'react-hook-form';

const FormInput = ({control, name, ...otherProps}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error }})=>(
      <>
        <TextInput
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        {...otherProps}
        />
        {error && <Text>
                  {error.message}
                  </Text>
        }
      </>
      )}
    />
  )
}
export default FormInput;