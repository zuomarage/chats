include bluetooth.h

int lastGray = 0;

{
  Serial1.begin(38400);
  Serial.begin(38400);
  pinMode(8, OUTPUT);
  digitalWrite(8, LOW);
  pinMode(1, INPUT);
}

void loop() {



  int middle = analogRead(A2) >> 2;
  int ring = analogRead(A3) >> 2;
  int pinkie = analogRead(A4) >> 2;

  int bit1 = 0;
  int bit2 = 0;
  int bit3 = 0;

  int note = 0;
  int noteconst = 0;
  int cmd = 0;
  int loudest = 0;
  int transpose = 0;

  //small delay to allow user to press multiple fingers
  delay(25);

  if (digitalRead(1) == HIGH)
  {
    transpose = 2;
  }
  else
  {
    transpose = 0;
  }

  if (middle > 10)
  {
    bit1 = B001;
  }
  if (ring > 10)
  {
    bit2 = B010;
  }
  if (pinkie > 10)
  {
    bit3 = B100;
  }

 
  int grayCode = bit1 + bit2 + bit3;
  Serial.println(grayCode);
  
  if (lastGray == grayCode && grayCode != 0) {

    int level = analogRead(A5);
    int mod = 0;

    if (level < 510 && level > 460)
    {
      mod = 0;
    } else if (level > 510 && level < 646)
    {
      mod = level - 484;
    } else if (level < 460 && level > 334);
    {
      mod = 484 - level;
    }

    sendNote(0xE0, 0, mod);

    if (middle > ring)
    {
      if (middle > pinkie)
      {
        loudest = middle;
      } else
      {
        loudest = pinkie;
      }
    } else if (ring > pinkie)
    {
      loudest = ring;
    }
  }
  if (loudest > 10)
  {
    Serial1.write(0xC0);
    Serial1.write(loudest);
  }


  if (lastGray != grayCode)
  {
   
    if (analogRead(A1) > 100)
    {
      noteconst = 12;
    }

    else
    {
      noteconst = 0;
    }

    turnoffNote();
    cmd = 0x90;
    if (Serial1.read() != -1)
    {
      digitalWrite(8, HIGH);


      lastGray = grayCode;
      Serial.println("last="+lastGray);

      if (analogRead(A0) > 100)
      {
        switch (grayCode)
        {
     
          default:
            Serial1.write(cmd);
            Serial1.write(30);
            Serial1.write(1);
            break;
 
          case 0:
            turnoffNote();
            break;
 
          case 1:
            sendChord("C", noteconst, transpose);
            break;

          case 2:
            sendChord("D", noteconst, transpose);
            break;

          case 3:
            sendChord("E", noteconst, transpose);
            break;

          case 4:
            sendChord("F", noteconst, transpose);
            break;

          case 5:
            sendChord("G", noteconst, transpose);
            break;

          case 6:
            sendChord("A", noteconst, transpose);
            break;

          case 7:
            sendChord("B", noteconst, transpose);
            break;
        }
      }

      else {

        switch (grayCode)
        {
          default:
            Serial1.write(cmd);
            Serial1.write(20);
            Serial1.write(1);
            break;

    
          case 0:
            turnoffNote();
            break;

         
          case 1:
            note = noteconst + 60;
            sendNote(cmd, note, 127);
            break;

          case 2:
            note = noteconst + 62;
            sendNote(cmd, note, 127);
            break;

          case 3:
            note = noteconst + 63;
            sendNote(cmd, note, 127);
            break;

          case 4:
            note = noteconst + 65;
            sendNote(cmd, note, 127);
            break;

          case 5:
            note = noteconst + 67;
            sendNote(cmd, note, 127);
            break;

          case 6:
            note = noteconst + 68;
            sendNote(cmd, note, 127);
            break;

          case 7:
            note = noteconst + 70;
            sendNote(cmd, note, 127);
            break;
        }
      }
    }
    else
    {

      turnoffNote();
    }
  }

}

void sendNote(int cmd, int note, int volume)
{
  Serial1.write(cmd);
  Serial1.write(note);
  Serial1.write(volume);
}


void turnoffNote()
{
  int noteoff = 48;
  while (noteoff < 85)
  {
    sendNote(0x80, noteoff, 127);
    noteoff++;
  }
}


void sendChord(String chord, int noteconst, int transpose)
{
  int chordInt = 0;
  
  if (chord == "C")
  {
    chordInt = 1;
  }


  else if (chord == "D")
  {
    chordInt = 2;
  }


  else if (chord == "E")
  {
    chordInt = 3;
  }

  else if (chord == "F")
  {
    chordInt = 4;
  }


  else if (chord == "G")
  {
    chordInt = 5;
  }


  else if (chord == "A")
  {
    chordInt = 6;
  }

  else if (chord == "B")
  {
    chordInt = 7;
  }
  switch (chordInt)
  {
    case 1:
      sendNote(0x90, 48 + noteconst + transpose, 127);
      sendNote(0x90, 51 + noteconst + transpose, 127);
      sendNote(0x90, 55 + noteconst + transpose, 127);
      break;

    case 2:
      sendNote(0x90, 50 + noteconst + transpose, 127);
      sendNote(0x90, 53 + noteconst + transpose, 127);
      sendNote(0x90, 56 + noteconst + transpose, 127);
      break;

    case 3:
      sendNote(0x90, 51 + noteconst + transpose, 127);
      sendNote(0x90, 55 + noteconst + transpose, 127);
      sendNote(0x90, 58 + noteconst + transpose, 127);
      break;

    case 4:
      sendNote(0x90, 53 + noteconst + transpose, 127);
      sendNote(0x90, 56 + noteconst + transpose, 127);
      sendNote(0x90, 60 + noteconst + transpose, 127);
      break;

    case 5:
      sendNote(0x90, 55 + noteconst + transpose, 127);
      sendNote(0x90, 58 + noteconst + transpose, 127);
      sendNote(0x90, 62 + noteconst + transpose, 127);
      break;

    case 6:
      sendNote(0x90, 56 + noteconst + transpose, 127);
      sendNote(0x90, 60 + noteconst + transpose, 127);
      sendNote(0x90, 63 + noteconst + transpose, 127);
      break;

    case 7:
      sendNote(0x90, 58 + noteconst + transpose, 127);
      sendNote(0x90, 62 + noteconst + transpose, 127);
      sendNote(0x90, 65 + noteconst + transpose, 127);
      break;
  }
}
