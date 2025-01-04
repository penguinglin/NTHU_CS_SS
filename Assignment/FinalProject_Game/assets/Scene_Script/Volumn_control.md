// ReadMe
# How to set the volumn to all of your scene's bgm/effect

## For Scene Bgm
### Step 1 : Set a static variable and name :"AudioID_<Scene_name>"
  Ex. static AudioID_Menu: number;
### Step 2 : Add code to "Script/<Scene_name>"
  Add the code to your Scene's script's onLoad function :

    Ex. 
    ```c
    <Scene_name>.AudioID_<Scene_name> = cc.audioEngine.playMusic(<your BGM>, true);
    cc.audioEngine.setVolume(<Scene_name>.AudioID_<Scene_name>, Menu.BGMVolume);
    ```

=> FINISH !

## For Effect

### Step 1: Add code
  Add the code to where you want to play effect
  Ex.
  ```c
  let <Variable_name> =  Menu.EffectVolume * 10;
  cc.audioEngine.play(<Audio_src>, false, <Variable_name>);
  ```

=> FINISH !