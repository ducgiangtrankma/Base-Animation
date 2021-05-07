/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import HeaderBar from '@/components/HeaderBarMain';
import IconF from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import SuperAlert from '@/components/SuperAlert';
import TextInputWithTitle from '@/components/TextInputWithTitle';
import {BACKGROUND_COLOR} from '@/constants/Colors';
import SuperButtonConfirm from '@/components/SuperButtonConfirm';
import ModalListCompany from './ModalListCompany';
import ModalListDepartMents from './ModalListDepartMent';
import {useNavigation} from '@react-navigation/native';
import ModalListChoosed from './ModalListChoosed';
import DateTimePicker from '@/components/DateTimePickerVip';
import DropDownPicker from 'react-native-dropdown-picker';
const EditPlan = (props) => {
  //state====================
  const item = props.route?.params;
  const {id: plan_id, inspection_thematic_id: thematic_id} = item;
  const navigation = useNavigation();
  const [planeName, setPlaneName] = useState();
  const [isVisibleTo, setIsVisibleTo] = useState(false);
  const [ModalCompany, setModalCompany] = useState(false);
  const [ModalListDepartMent, setModalListDepartMent] = useState(false);
  const [InfoCompany, setInfoCompany] = useState(null);
  const [ModalChoosed, setModalChoosed] = useState(false);
  const [type, setType] = useState(null);
  const [Infomation, setInfomation] = useState(null);
  const [frequency, setFrequency] = useState(null);
  const [Data, setData] = useState([]);
  const [isTwoWay, setisTwoWay] = useState('');
  const superAlertRef = useRef();
  const [time, setTime] = useState(null);
  const currentRole = useSelector((state) => state.authenReducer?.currentRole);
  const full_name = useSelector(
    (state) => state.authenReducer?.useData?.full_name,
  );
  const [activeIndex, setActiveIndex] = useState();
  console.log('id', item);
  useEffect(() => {
    const unSubcribe = navigation.addListener('focus', () => {
      setInfomation(item);
      setData();
    });
    return unSubcribe;
  }, [item, navigation]);
  const TypePlane = [
    {
      label: 'Đột xuất',
      value: 'FORTUITY',
    },
    {
      label: 'Định kì',
      value: 'PERIODIC',
    },
  ];

  const Frequency = [
    {
      label: 'Tháng',
      value: 'MONTH',
    },
    {
      label: 'Quý',
      value: 'QUARTER',
    },
    {
      label: 'Năm',
      value: 'YEAR',
    },
  ];
  function headerLeft() {
    return (
      <TouchableOpacity onPress={() => props.navigation.pop(1)}>
        <IconF name="arrow-left" size={30} color={'black'} />
      </TouchableOpacity>
    );
  }
  useEffect(() => {
    console.log('Infomation', Infomation);
  }, [Infomation]);
  useEffect(() => {
    console.log('Data', Data);
  }, [Data]);
  const submit = (Type) => {};
  const handleConfirmList = (data) => {
    let newList = [...Data];
    if (newList.length < 0) {
      setData(data.filter((item) => item.isSelected === true));
    } else {
      newList = newList.map((item) => {
        const index = data.findIndex((e) => e.id === item.id);
        index >= 0 && (item = data[index]);
        return item;
      });
      let newData = data.filter(
        (item) =>
          item.isSelected === true &&
          newList.findIndex((e) => e.id === item.id) < 0,
      );
      newList = newList.concat(newData);
      setData(newList.filter((e) => e.isSelected === true));
    }
    setModalListDepartMent(false);
  };
  useEffect(() => {
    console.log('InfoCompany', InfoCompany);
  }, [InfoCompany]);
  return (
    <SafeAreaView style={styles.SafeView}>
      <SuperAlert ref={superAlertRef} />
      <HeaderBar headerTitle="Sửa kế hoạch" headerLeft={headerLeft} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.viewContainer}>
          <TextInputWithTitle
            borderColor={true ? '#BDBEC4' : 'red'}
            textValue={Infomation?.name}
            title="Tên kế hoạch"
            onChangeText={(text) => {
              setInfomation({...Infomation, name: text});
            }}
          />
          <TextInputWithTitle
            borderColor={true ? '#BDBEC4' : 'red'}
            textValue={Infomation?.content}
            title="Nội dung"
            onChangeText={(text) => {
              setInfomation({...Infomation, content: text});
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setModalCompany(true);
            }}
            style={{
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 50,
              flexDirection: 'row',
              paddingLeft: 15,
              paddingRight: 10,
              borderWidth: 0.5,
              borderColor: 'gray',
              borderRadius: 5,
              marginHorizontal: 5,
            }}>
            <Text>
              {InfoCompany === null
                ? 'Chọn công ty kiểm tra'
                : InfoCompany?.name}
            </Text>
            <IconF name="chevron-down" size={15} />
          </TouchableOpacity>
          <ModalListCompany
            Visible={ModalCompany}
            Onpress={() => {
              setModalCompany(false);
            }}
            HandleClick={(item) => {
              const data = {
                name: item.name,
                id: item.id,
              };
              setInfoCompany(data);
              setModalCompany(false);
            }}
          />
          {InfoCompany !== null && (
            <TouchableOpacity
              onPress={() => {
                setModalListDepartMent(true);
              }}
              style={{
                marginTop: 20,
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 50,
                flexDirection: 'row',
                paddingLeft: 15,
                paddingRight: 10,
                borderWidth: 0.5,
                borderColor: 'gray',
                borderRadius: 5,
                marginHorizontal: 5,
              }}>
              <Text>{'Chọn vị cần kiểm tra'}</Text>
              <IconF name="chevron-down" size={15} />
            </TouchableOpacity>
          )}
          <ModalListDepartMents
            Visible={ModalListDepartMent}
            Onpress={() => {
              setModalListDepartMent(false);
            }}
            ID={InfoCompany}
            HandleConfirm={(data) => {
              handleConfirmList(data);
            }}
            List={Data}
          />
          {Data > 0 ? (
            <TouchableOpacity
              style={{height: 50, justifyContent: 'center', marginLeft: 10}}
              onPress={() => {
                setModalChoosed(true);
              }}>
              <Text style={{color: 'blue', textDecorationLine: 'underline'}}>
                Xem danh sách đơn vị đã chọn
              </Text>
            </TouchableOpacity>
          ) : InfoCompany ? (
            <View
              style={{height: 50, justifyContent: 'center', marginLeft: 10}}>
              <Text style={{color: 'gray'}}>
                <Text style={{color: 'red'}}>*</Text>Chưa chọn đơn vị kiểm tra
              </Text>
            </View>
          ) : (
            <View
              style={{height: 25, justifyContent: 'center', marginLeft: 10}}
            />
          )}
          <ModalListChoosed
            Visible={ModalChoosed}
            Onpress={() => {
              setModalChoosed(false);
            }}
            data={Data}
            onRemove={(item) => {
              let newData = [...Data];
              setData(newData.filter((e) => item?.id !== e?.id));
            }}
          />
          <DropDownPicker
            zIndex={11800}
            items={TypePlane}
            defaultValue={Infomation?.type}
            containerStyle={styles.containerStyleDropdown}
            style={styles.dropDownStyle}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            placeholder="Chọn loại kiểm tra"
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={(itemValue) => {
              setInfomation({...Infomation, type: itemValue.value});
            }}
          />
          {Infomation?.type === 'PERIODIC' && (
            <DropDownPicker
              zIndex={11800}
              items={Frequency}
              defaultValue={Infomation?.frequency}
              containerStyle={styles.containerStyleDropdown2}
              style={styles.dropDownStyle}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              placeholder="Chọn loại tần suất"
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={(itemValue) => {
                setInfomation({...Infomation, frequency: itemValue.value});
              }}
            />
          )}
          {Infomation?.type === 'FORTUITY' && (
            <View style={styles.viewTime}>
              <TouchableOpacity
                onPress={() => {
                  setIsVisibleTo(true);
                }}>
                <DateTimePicker
                  fomatDate="HH:mm  DD/MM/YYYY"
                  dateSelect={
                    Infomation?.inspect_date
                      ? Infomation?.inspect_date * 1000
                      : null
                  }
                  isDatePickerVisible={isVisibleTo}
                  handleConfirm={(date) => {
                    setInfomation({
                      ...Infomation,
                      inspect_date: Math.floor(date.getTime() / 1000),
                    });
                    setIsVisibleTo(false);
                  }}
                  hideDatePicker={() => setIsVisibleTo(false)}
                  mode="datetime"
                  title="Thời gian kiểm tra"
                  defaultFormatString="--:--  --/--/--"
                />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.button}>
            <SuperButtonConfirm
              title="Sửa kế hoạch"
              onPress={() => submit(type)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditPlan;

const styles = StyleSheet.create({
  dropDownStyle: {
    borderColor: '#BDBEC4',
    borderWidth: 1,
  },
  viewItemMonth: {
    borderRadius: 5,
    height: 100,
    marginLeft: 25,
    marginRight: 25,
  },
  SafeView: {flex: 1, backgroundColor: BACKGROUND_COLOR},
  scrollView: {backgroundColor: 'white', flexDirection: 'column', flex: 1},
  viewContainer: {
    paddingHorizontal: 10,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 120,
  },
  containerStyleDropdown: {height: 55, marginHorizontal: 5},
  containerStyleDropdown2: {height: 55, marginTop: 25, marginHorizontal: 5},
  viewTS: {flex: 1, marginVertical: 5, marginTop: 15},
  viewMonth: {flex: 1, flexDirection: 'row', justifyContent: 'center'},
  button: {marginLeft: 5, marginRight: 5, marginTop: 20},
  viewTime: {flex: 1, marginVertical: 5, marginTop: 10},
});
