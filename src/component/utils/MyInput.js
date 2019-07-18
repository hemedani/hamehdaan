import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import teamcheStyle, { teamcheColors } from "../../styles/MyStyles";

// const MyInput = ({ value, name, onChange, label, ...rest }) => {
//   const _handleChange = newVal => onChange(name, newVal);
//   value = value ? value.toString() : "";
//   return (
//     <View style={myInputStyles.root}>
//       {label && <Text style={[teamcheStyle.textBase, myInputStyles.myInpLabel]}>{label}</Text>}
//       <TextInput
//         autoCapitalize="none"
//         autoCompleteType="off"
//         autoCorrect={false}
//         style={[teamcheStyle.textBase, myInputStyles.textInp]}
//         {...rest}
//         value={value}
//         onChangeText={_handleChange}
//         placeholder={label}
//       />
//     </View>
//   );
// };

// class MyInput extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     this._handleChange = this._handleChange.bind(this);
//   }
//   _handleChange(value) {
//     this.props.onChange(this.props.name, value);
//   }
//   render() {
//     const { value, label, ...rest } = this.props;
//     return (
//       <View style={myInputStyles.root}>
//         {label && <Text style={[teamcheStyle.textBase, myInputStyles.myInpLabel]}>{label}</Text>}
//         <TextInput
//           autoCapitalize="none"
//           autoCompleteType="off"
//           autoCorrect={false}
//           style={[teamcheStyle.textBase, myInputStyles.textInp]}
//           {...rest}
//           value={value}
//           onChangeText={this._handleChange}
//           placeholder={label}
//         />
//       </View>
//     );
//   }
// }

const MyInput = ({ handler, touched, hasError, meta }) => {
  // const _handleChange = onChange(name);
  return (
    <View style={myInputStyles.root}>
      {meta.label && <Text style={[teamcheStyle.textBase, myInputStyles.myInpLabel]}>{meta.label}</Text>}
      <TextInput
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        keyboardType={meta.keyboardType ? meta.keyboardType : "default"}
        style={[teamcheStyle.textBase, myInputStyles.textInp]}
        {...handler()}
        placeholder={meta.label}
      />
    </View>
  );
};

export const myInputStyles = StyleSheet.create({
  root: {
    width: "95%",
    alignSelf: "center",
    marginBottom: 10
  },
  myInpLabel: {
    paddingStart: 15,
    color: teamcheColors.dark
  },
  textInp: {
    height: 38,
    width: "90%",
    borderColor: teamcheColors.lightPink,
    backgroundColor: teamcheColors.lightGray,
    borderWidth: 0.6,
    borderRadius: 3,
    paddingHorizontal: 10,
    marginEnd: 10,
    textAlign: "right"
  }
});

export default MyInput;
