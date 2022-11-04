// import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton,
         IonTitle, IonContent, IonItem, IonLabel,
         IonGrid, IonRow, IonCol,
         IonSegment, IonSegmentButton,
         IonInput, IonButton,
         useIonPicker, IonIcon,
         IonList, IonSelect, IonSelectOption } from '@ionic/react';
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
  const [ tone, setTone ] = useState('surprise');
  const [ timerState, setTimerState ] = useState('stopped'); // stopped or running

  const [ currentSec, setCurrentSec ] = useState(0);
  const toggleTimerState = (e: any) => {
    const currentState = e.target['data-value'];
    const newState = currentState == 'stopped' ? 'running' : 'stopped';
    console.log('Setting New state:', newState)
    setTimerState(newState);
  }

  const incrementTimer = async () => {
    await new Promise<void>((resolve, reject) => { setTimeout(()=>{resolve()}, 1000) });
    if (timerState == 'running') {
      setCurrentSec(currentSec+1);  
    } else {
      console.log('Stopped')
    }
  }

  useEffect(() => {
    console.log('Use Effect - timer state:', timerState, currentSec);

    const sec = currentSec % 60;
    const min = Math.floor(currentSec / 60) % 60;
    const hr = Math.floor(currentSec / 3600);
    setSec(sec);
    setMin(min);

    incrementTimer();
  }, [timerState, currentSec])

  const [ present ] = useIonPicker();
  const options: Array<object> = [];
  for (let i=1; i<=60; i++) options.push({ text: i, value: i });
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

        <IonItem lines="none" className="mt-3 md-3">
          <IonLabel class="ion-text-center timer-text ion-margin">
            <div>{normalizeTime(min)}:{normalizeTime(sec)}</div>
          </IonLabel>
        </IonItem>

        <IonItem lines="none" className="md-3">
          <IonGrid>
            <IonRow>
              <IonCol>
                <div>Notification interval:</div>
              </IonCol>
            </IonRow>


            <IonRow>
              <IonCol size="auto">
                <div>
                  <IonButton
                    className={"interval-btn" + ((activeButton=="every") ? " active" : "")}
                    onClick={e => setButtonActive("every")}>Every</IonButton>
                  <IonButton
                    className={"interval-btn" + ((activeButton=="after") ? " active" : "")}
                    onClick={e => setButtonActive("after")}>After</IonButton>
                </div>
              </IonCol>

              <IonCol size="auto"> 
                <div style={{ border: "0px solid red"}}>
                  <IonButton expand="full" onClick={openPicker}>
                    {selectedTime} <IonIcon slot="end" icon={caretDownOutline}></IonIcon>
                  </IonButton>
                </div>
                {/*<IonItem>
                  <IonInput type="number" placeholder="10" value="10"></IonInput>
                </IonItem>*/}
              </IonCol>
              
              <IonCol size="auto">
                <div>
                  <IonButton
                    className={"interval-btn" + ((activeTimeUnit=="sec") ? " active" : "")}
                    onClick={e => setTimeUnit("sec")}>Sec</IonButton>
                  <IonButton
                    className={"interval-btn" + ((activeTimeUnit=="min") ? " active" : "")}
                    onClick={e => setTimeUnit("min")}>Min</IonButton>
                  <IonButton
                    className={"interval-btn" + ((activeTimeUnit=="hr") ? " active" : "")}
                    onClick={e => setTimeUnit("hr")}>Hr</IonButton>
                </div>
              </IonCol>
            </IonRow>

            <IonRow className="info">
              <IonCol>
                <div>As per your selection, a sound will play <strong>{activeButton == 'every' ? 'after every' : 'only once after'} {selectedTime} {activeTimeUnit}.</strong></div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonItem>

        <IonItem lines="none" className="md-5 brd-">
          <IonGrid className="brg-">
            <IonRow className="brd-">
              <IonCol size="4" className="brg-" style={{margin: "auto", width:"10%"}}>
                <span>Select sound:</span>
              </IonCol>
              <IonCol size="8" className="brg-">
                <IonList className="brg- tone-select-list">
                  <IonItem lines="none" className="brd-">
                    <IonSelect interface="popover"
                               placeholder="Select sound"
                               value={tone}
                               className="brg-"
                               onIonChange={(e) => setTone(e.detail.value)}>
                      <IonSelectOption value="surprise">Surprise</IonSelectOption>
                      <IonSelectOption value="twinkle">Twinkle</IonSelectOption>
                      <IonSelectOption value="inbound">Inbound</IonSelectOption>
                      <IonSelectOption value="cozy">Cozy</IonSelectOption>
                      <IonSelectOption value="ding">Ding</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                </IonList>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonItem>

        <IonItem lines="none" className="md-5">
          <IonButton className="start-stop-btn"
                     onClick={e => toggleTimerState(e)}
                     data-value={timerState}>
            {(timerState == 'stopped') ? "Start" : "Stop"}
          </IonButton>
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
