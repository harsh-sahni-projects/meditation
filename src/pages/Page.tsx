// import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton,
         IonTitle, IonContent, IonItem, IonLabel,
         IonGrid, IonRow, IonCol,
         IonSegment, IonSegmentButton,
         IonInput, IonButton,
         useIonPicker, IonIcon } from '@ionic/react';
import { caretDownOutline } from 'ionicons/icons'
// import { useParams } from 'react-router';
// import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import { useState, useEffect } from 'react';

const Page: React.FC = () => {

  // const { name } = useParams<{ name: string; }>();

  const [ min, setMin ] = useState(0);
  const [ sec, setSec ] = useState(0);
  const [ selectedTime, setSelectedTime ] = useState(1);
  const [ activeButton, setButtonActive ] = useState('every');
  const [ activeTimeUnit, setTimeUnit ] = useState('sec');

    
  const [ present ] = useIonPicker();
  const options: Array<object> = [];

  for (let i=1; i<=60; i++) {
    let obj = {
      text: i,
      value: i
    }
    options.push(obj);
  }
  // alert(JSON.stringify(options))

  const openPicker = async() => {
    present({
      columns: [
        {
          name: 'time',
          options: options
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Done',
          handler: (val) => {
            setSelectedTime(Number(val.time.text));
          }
        }
      ]
    })
  }

  // useEffect(() => {
  //   alert(selectedTime);
  // }, [selectedTime])


  const normalizeTime = (num: number) => {
    return (num < 10) ? '0'+num : num;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          {/*<IonTitle>{name}</IonTitle>*/}
          <IonTitle>Meditation</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>

        <IonItem lines="none">
          <IonLabel class="ion-text-center timer-text ion-margin">
            <div>{normalizeTime(min)}:{normalizeTime(sec)}</div>
          </IonLabel>
        </IonItem>

        <IonItem lines="none">
          <IonLabel>Notification interval:</IonLabel>
        </IonItem>

        <IonItem lines="none">
          <IonGrid>
            <IonRow>
              <IonCol size="auto">
                <div>
                  <IonButton className={"interval-btn" + ((activeButton=="every") ? " active" : "")} onClick={e => setButtonActive("every")}>Every</IonButton>
                  <IonButton className={"interval-btn" + ((activeButton=="after") ? " active" : "")} onClick={e => setButtonActive("after")}>After</IonButton>
                </div>
              </IonCol>

              <IonCol> 
                <div style={{width: "150px", border: "0px solid red"}}>
                  <IonButton expand="full" onClick={openPicker}>
                    {selectedTime} <IonIcon slot="end" icon={caretDownOutline}></IonIcon>
                  </IonButton>
                </div>
                {/*<IonItem>
                  <IonInput type="number" placeholder="10" value="10"></IonInput>
                </IonItem>*/}
              </IonCol>
              
              <IonCol>
                <div>
                  <IonButton className={"interval-btn" + ((activeTimeUnit=="sec") ? " active" : "")} onClick={e => setTimeUnit("sec")}>Sec</IonButton>
                  <IonButton className={"interval-btn" + ((activeTimeUnit=="min") ? " active" : "")} onClick={e => setTimeUnit("min")}>Min</IonButton>
                  <IonButton className={"interval-btn" + ((activeTimeUnit=="hr") ? " active" : "")} onClick={e => setTimeUnit("hr")}>Hr</IonButton>
                </div>
              </IonCol>
            
            </IonRow>
          </IonGrid>
        </IonItem>

        {/*<IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name={name} />*/}
      </IonContent>
    </IonPage>
  );
};

export default Page;
