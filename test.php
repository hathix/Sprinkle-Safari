<?php
    //send json data through post via $.post().
    //send 'file' as the filename you want to write to.
    //send true or false for remove_duplicates.
    //this file will write it to the file.
    $json ='{"passcode":"chrome1","data":{"ss-game-saved":"true","date":"2012-05-06T04:25:28.846Z","ss-minigames-won":"24","ss-passcode":"chrome1"}}';
    
    $filename = 'sprinklecloud.json'; //the filename to write to
    $remove_duplicates = 'yes'; //'yes' or 'no'; booleans are stupid in JS->PHP
    
    define('PROPERTY_ID', 'passcode'); //each json item stored will have a unique ID; if another item stored already has the same ID when writing, the old item will be removed and replaced with the new one.
    
    if (json_decode($json) != null) {/* sanity check */
        if(file_exists($filename) == false){
            //file doesn't exist, just write the obj surrounded by braces, as in
            /*
             * [obj]
             */
            $file = fopen($filename, 'w');
            fwrite($file, "[$json]");
            fclose($file);
        }
        else{
            //file exists, must edit it
            $file = fopen($filename, 'r');
        
            //stupid json semantics - always ensure it's in the form:
            /*
             * [obj,
             *  obj]
             */
        
            //read json code into a php variable
            $json_php = json_decode($json, true); //assoc array
        
            //read the contents of the file...
            $str = file_get_contents($filename);
            
            echo $str;
            
            //turn str into json...
            $json_array = json_decode($str, true); //assoc array
            
            var_dump($json_array);
            
            //remove duplicates; check each one to see if the id matches
            if($remove_duplicates == 'yes'){
                $id = $json_php[PROPERTY_ID];
                //instead of removing, take a blank array and add whatever has a DIFFERENT id
                $new_array = array();
                
                foreach($json_array as $key => $json_obj){
                    $obj_id = $json_obj[PROPERTY_ID];
                    if($obj_id != $id){
                        $new_array []= $json_obj;
                    }
                }
                
                $json_array = $new_array;
            }
            
            //tack on the new stuff...
            $json_array []= $json_php;
            //turn back into json...
            $newstr = json_encode($json_array);
            //remove annoying \"
            $newstr = stripcslashes($newstr);
            //remove strange ""
            $newstr = str_replace('""', '"', $newstr);
            
            echo $newstr;
            
            //get rid of what's currently in file and put in str
            //close read mode and re-open in write mode so we delete what's in here
            fclose($file);
        }
    } else {
        // handle error
        echo "NO!!!!";
    } 
?>