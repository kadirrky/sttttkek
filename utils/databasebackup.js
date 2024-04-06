import fs from 'fs';

export default (command) => {
  ///console.log(command)


    if(command === "voicestat"){
      let errorStatus = "false"

        const filesToProcess = [
          "./database/totalvoicestatdata.json",
          "./database/weekvoicestatdata.json",
          "./database/dayvoicestatdata.json"
        ];

        filesToProcess.forEach(filePath => {

        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
              console.error('Dosya okuma hatası:', err);
              errorStatus = "true"    
          }
          if(errorStatus === "true") return console.log("Data okunurken hata çıktı.") 
          let jsonbackupcntrll
          let jsonData
          try{
              jsonData = JSON.parse(data)            
              jsonbackupcntrll = true
          } catch (error) {                      
              jsonbackupcntrll = false
          }

          if(jsonbackupcntrll) {
              fs.readFile(filePath, 'utf8', (err, data) => {
                  if (err) {
                    console.error('Gerçek dosya okunurken bir hata oluştu:', err);
                    return;
                  }
        const backupFilePath = filePath.replace('./database/', './database/').replace('.json', 'backup.json');
                  fs.writeFile(backupFilePath, data, 'utf8', (err) => {
                    if (err) {
                      console.error('Gerçek dosya yazılırken bir hata oluştu:', err);
                      return;
                    }
                    ///console.log('Gerçek dosya başarıyla yedeklendi. (voice)');
                  });
                });
          } 
          else {
              console.log('data parsellere ayırılamadı.');
          }    
        });

        });
    }

    if(command === "messagestat"){
    let errorStatus = "false"

      const filesToProcess = [
        "./database/totalmessagestatdata.json",
        "./database/weekmessagestatdata.json",
        "./database/daymessagestatdata.json"
      ];

      filesToProcess.forEach(filePath => {

      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Dosya okuma hatası:', err);
            errorStatus = "true"    
        }
        if(errorStatus === "true") return console.log("Data okunurken hata çıktı.") 
        let jsonbackupcntrll
        let jsonData
        try{
            jsonData = JSON.parse(data)            
            jsonbackupcntrll = true
        } catch (error) {                      
            jsonbackupcntrll = false
        }

        if(jsonbackupcntrll) {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                  console.error('Gerçek dosya okunurken bir hata oluştu:', err);
                  return;
                }
      const backupFilePath = filePath.replace('./database/', './database/').replace('.json', 'backup.json');
      ///console.log(backupFilePath)
                fs.writeFile(backupFilePath, data, 'utf8', (err) => {
                  if (err) {
                    console.error('Gerçek dosya yazılırken bir hata oluştu:', err);
                    return;
                  }
                  ///console.log('Gerçek dosya başarıyla yedeklendi.(message)');
                });
              });
        } 
        else {
            console.log('data parsellere ayırılamadı.');
        }    
      });

      });









      // fs.readFile("./database/totalmessagestatdata.json", 'utf8', (err, data) => {
      //   if (err) {
      //       console.error('Dosya okuma hatası:', err);
      //       errorStatus = "true"    
      //   }
      //   if(errorStatus === "true") return console.log("Data okunurken hata çıktı.") 
      //   let jsonbackupcntrll
      //   let jsonData
      //   try{
      //       jsonData = JSON.parse(data)            
      //       jsonbackupcntrll = true
      //   } catch (error) {                      
      //       jsonbackupcntrll = false
      //   }

      //   if(jsonbackupcntrll) {
      //       fs.readFile('./database/totalmessagestatdata.json', 'utf8', (err, data) => {
      //           if (err) {
      //             console.error('Gerçek dosya okunurken bir hata oluştu:', err);
      //             return;
      //           }
              
      //           fs.writeFile('./database/totalmessagestatdatabackup.json', data, 'utf8', (err) => {
      //             if (err) {
      //               console.error('Gerçek dosya yazılırken bir hata oluştu:', err);
      //               return;
      //             }
      //             console.log('Gerçek dosya başarıyla yedeklendi.');
      //           });
      //         });
      //   } 
      //   else {
      //       console.log('data parsellere ayırılamadı.');
      //   }    
      // });
    }

    if(command === "voicestatmor"){
      let errorStatus = "false"

        const filesToProcess = [
          "./databasemor/totalvoicestatdata.json",
          "./databasemor/weekvoicestatdata.json",
          "./databasemor/dayvoicestatdata.json"
        ];

        filesToProcess.forEach(filePath => {

        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
              console.error('Dosya okuma hatası:', err);
              errorStatus = "true"    
          }
          if(errorStatus === "true") return console.log("Data okunurken hata çıktı.") 
          let jsonbackupcntrll
          let jsonData
          try{
              jsonData = JSON.parse(data)            
              jsonbackupcntrll = true
          } catch (error) {                      
              jsonbackupcntrll = false
          }

          if(jsonbackupcntrll) {
              fs.readFile(filePath, 'utf8', (err, data) => {
                  if (err) {
                    console.error('Gerçek dosya okunurken bir hata oluştu:', err);
                    return;
                  }
        const backupFilePath = filePath.replace('./databasemor/', './databasemor/').replace('.json', 'backup.json');
                  fs.writeFile(backupFilePath, data, 'utf8', (err) => {
                    if (err) {
                      console.error('Gerçek dosya yazılırken bir hata oluştu:', err);
                      return;
                    }
                    ///console.log('Gerçek dosya başarıyla yedeklendi. (voice)');
                  });
                });
          } 
          else {
              console.log('data parsellere ayırılamadı.');
          }    
        });

        });
    }

    if(command === "messagestatmor"){
    let errorStatus = "false"

      const filesToProcess = [
        "./databasemor/totalmessagestatdata.json",
        "./databasemor/weekmessagestatdata.json",
        "./databasemor/daymessagestatdata.json"
      ];

      filesToProcess.forEach(filePath => {

      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Dosya okuma hatası:', err);
            errorStatus = "true"    
        }
        if(errorStatus === "true") return console.log("Data okunurken hata çıktı.") 
        let jsonbackupcntrll
        let jsonData
        try{
            jsonData = JSON.parse(data)            
            jsonbackupcntrll = true
        } catch (error) {                      
            jsonbackupcntrll = false
        }

        if(jsonbackupcntrll) {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                  console.error('Gerçek dosya okunurken bir hata oluştu:', err);
                  return;
                }
      const backupFilePath = filePath.replace('./databasemor/', './databasemor/').replace('.json', 'backup.json');
      ///console.log(backupFilePath)
                fs.writeFile(backupFilePath, data, 'utf8', (err) => {
                  if (err) {
                    console.error('Gerçek dosya yazılırken bir hata oluştu:', err);
                    return;
                  }
                  ///console.log('Gerçek dosya başarıyla yedeklendi.(message)');
                });
              });
        } 
        else {
            console.log('data parsellere ayırılamadı.');
        }    
      });

      });
    }

    if(command === "messagestatmorcmnd"){
      let errorStatus = "false"
  
        const filesToProcess = [
          "./databasemorcmnd/totalmessagestatdata.json",
          "./databasemorcmnd/weekmessagestatdata.json",
          "./databasemorcmnd/daymessagestatdata.json"
        ];
  
        filesToProcess.forEach(filePath => {
  
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
              console.error('Dosya okuma hatası:', err);
              errorStatus = "true"    
          }
          if(errorStatus === "true") return console.log("Data okunurken hata çıktı.") 
          let jsonbackupcntrll
          let jsonData
          try{
              jsonData = JSON.parse(data)            
              jsonbackupcntrll = true
          } catch (error) {                      
              jsonbackupcntrll = false
          }
  
          if(jsonbackupcntrll) {
              fs.readFile(filePath, 'utf8', (err, data) => {
                  if (err) {
                    console.error('Gerçek dosya okunurken bir hata oluştu:', err);
                    return;
                  }
        const backupFilePath = filePath.replace('./databasemorcmnd/', './databasemorcmnd/').replace('.json', 'backup.json');
        ///console.log(backupFilePath)
                  fs.writeFile(backupFilePath, data, 'utf8', (err) => {
                    if (err) {
                      console.error('Gerçek dosya yazılırken bir hata oluştu:', err);
                      return;
                    }
                    ///console.log('Gerçek dosya başarıyla yedeklendi.(message)');
                  });
                });
          } 
          else {
              console.log('data parsellere ayırılamadı.');
          }    
        });
  
        });
    }


}