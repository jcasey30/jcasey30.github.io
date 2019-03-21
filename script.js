https:var cache = {}
var tableDict = [];
function openNav() {
  document.getElementById("mySidenav").style.width = "700px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
$(() => {
  let buildingnames = {'GTECH.B017M_DataRecorder':'Bobby Dodd','B017M_DataRec':'Bobby Dodd Stadium',
  'B109M':'Caldwell Residence','B005M_DataRec5':'North Residence','B064M':'Shell Residence',
  'B075M_West':'College of Design','B153M':'Klaus','B002M':'Skiles', 'B003M':'Alumni House',
  'B010M':'Howell Residence Hall', 'B011M':'Harris Residence Hall',
  'B012M':'Brittain Dining Hall', 'B014M':'Harrison Residence Hall',
  'B015M':'Towers Residence Hall', 'B016M':'Glenn Residence Hall',
  'B017M_DataRec':'Bobby Dodd Stadium',  'GTECH.B020E_ML1':'WREK TOWER',
  'B022M':'Daniel Lab',' GTECH.B024E_M1L1':'DM Smith', 'B025M':'Chapin',
  'B026M_DATA3':'Holland', 'B029M':'Lyman Hall', 'B030M':'A.French',
  'B031M':'Student Sucess center', 'GTECH.B032E_ML1':'Facilities Admin',
  'B033M_DataRec':'O Keefe', 'GTECH.B035E_U2L1':'Administration', 'B036M':'Carnegie','B036M_DataRec':'Carnegie',
  'B038M':'Savant', 'B039M':'Swann', 'B040M':'Guggenheim',
  'B041M':'ES and M', 'B045M':'JS Coon', 'GTECH.B046E_ML1':'Beringause',
  'GTECH.B047E_MH1':'Wardlaw',  'B050M_DataRec':'Computing (CoC)', 'B050M_DataRec':'College of Computing',
  'B051AM_DataRec':'Hinman (Rich Bldg)', 'B051DM':'Rich Computer Center',
  'B051FM':'Rich Chiller Plant', 'B055M':'Instructional Center',
  'B056M':'Groseclose', 'B057M':'ISYE Annex', 'B058M':'Civil Engineering (old)',
  'B059M':'Stephen C. Hall', 'B061M':'430 10th St North', 'B061AM':'430 10th St South',
  'B066M_DataRec':'Cherry Emerson', 'B075M_DataRec':'Architecture (West)',
  'GTECH.B076E_ML1':'Architecture (East)', 'B077M':'Price Library',
  'B081M':'Howey Physics', 'B084M':'Weber (SST#1)', 'B085M':'Van Leer',
  'B086M':'Bunger Henry', 'B094M':'Hopkins Residence Hall','GTECH.B094M_DataRecorder':'Hopkins',
  'B095M_DataRec':'Pettit', 'B098M':'Weber (SST#3)', 'B100M':'Crossland Tower',
  'B101M':'Knight (SST#2)', 'B103M':'Boggs', 'B104M_DataRec':'Student Center',
  'B106M':'Fulmer Residence Hall', 'B107M':'Hefner Residence Hall',
  'B111M':'Mason CE', 'B114M':'Stamps Student Center Commons',
  'B114AM':'Stamps Addition', 'B115M':'Couch',
  'B116M_DataRec':'Woodruff Residence Hall', 'B118M':'Montag Residence Hall',
  'B119':'Fitten Residence Hall', 'B123M_DataRec':'Smithgall Bldg (mixed use)',
  'B124M_DataRec':'Center for Arts', 'B126M_DataRec':'MaRC',
  'GTECH.B129E_MH1':'IPST', 'B130M':'8th St Apartment',
  'B131M':'Hemphill Apartment', 'B132M':'Center St Apartment',
  'GTECH.B133M_DataRecorder':'Tenth St Chiller Plant',
  'B135M':'MRDC', 'GTECH.B136E_MH1':'Tech Way Bldg',
  'B138M':'811 Marietta Street', 'B144M':'Love Manufacturing',
  'B145E_U5H1':'SEB', 'B146M':'IBB', 'B147M':'ES and T',
  'GTECH.B149E_MH1':'NARA Structures Eng. Lab', 'B160M_DataRec':'CRC','GTECH.B160M_DataRecorder':'CRC',
  'B165M':'BME', 'B166M_BLDG':'CULC','B166M_DataRec':'CULC','B166M_DataRec1':'CULC', 'B166M_DataRec2':'CULC','B167M':'MS and E',
  'GTECH.B170E_MH1':'Global Learning Center', 'GTECH.B172_U3H1':'COM',
  'B173E_U10H1':'EDI', 'B177M':'Student Health Center', 'B181M':'Nano',
  'GTECH.B184E_M1H1':'831 Marietta Street', 'B195M':'EBB', 'B199M':'CNES',
  'GTECH.B209M_Datarecorder':'West Village', 'B790M_DataRec':'CRB'}
  let final_arr     = [] //unfiltered data array
  let testing       = []
  let original_list = []
  let filtered_arr  = []
  let num_list      = []
  let time_arr      = []
  let bad_point_arr = [] //** Array that has the bad points to display
  let final_arr2    = [] //** Unfiltered data array for comparison
  let table_mat     = []
  let table_mat2    = []
  let cell_location = []
  let series_list   = []
  let time_list     = []
  let quantity_name = ''
  let qname         = ''
  let array_count   = false
  let chart_init    = false
  let reverse_check = 0
  let date_arr = [];
  let ID_source =''
  let ID_source2 = ''
  let ID_source_list = [];
  let html = ''
  var html3 = ''

  // let html = ''
  // html = ''
  $("#dropdownsel a").click(function(e){
    e.preventDefault(); // cancel the link behaviour
    ID_source2 = $(this).text();
    $("#dropdownbut").text(ID_source2);
    // alert(ID_source2)
  });

  // let ID_source2 = selText

  $('#btn3').on('click', () => {
    // let html = '';
    // console.log(html);
    document.getElementById('div1').innerHTML = "";
    html = ''
    $("#div1").empty();
    $('html').toggleClass('loading')
    /*Extracting time selected*/
    let date            = $('#date').val()
    let date_month_new  = `${ date }-01T05:00:00`
    let date2           = $('#date2').val()
    let date_month_new2 = `${ date2 }-01T05:00:00`
    let time            = $('#time').val()
    let dateAPI         = `${ date } ${ time }`
    let dateAPI2        = `${ date2 } ${ time }`
    let dateParsed      = date.split('-')
    let dateParsed2     = date2.split('-')
    let timeParsed      = ['00', '00']
    let globalDate      = dateParsed.concat(timeParsed)
    let globalDate2     = dateParsed2.concat(timeParsed)
    let finalDate       = new Date(date_month_new)
    let finalDate2      = new Date(date_month_new2)
    let address2        = 'https://energywatch.fac.gatech.edu:3000/api/rollcall'
    // let ID_source              = $('#combo :selected').text();
    let ID_source       = ID_source2

    if (ID_source == 'Condensate'){
      ID_source_list =['Condensate','COND_TOT(100GAL)','CONDENSATE TOTAL','CONDENSATE_TOTAL(GAL)','A1 HOUSE COND 10GAL','AAW STAD CON 10GAL','EDG CON 10GAL',
                        'COND #1*100GPM (100GAL)','COND #2*100GPM (100GAL)','CONDENSATE TOT (10*2GAL)','COND_TOT_(100GAL)','094_CONDENSATE1 TOTAL (100GAL)','COND_TOT_GAL10*2(100GAL)',
                        'COND_TOT (100GAL)','COND RETURN 1','COND RETURN 2','CONDENSATE_TANK(100GAL)','CondensateTot (100GAL)','Condensate1Tot (100GAL)','STEAM TOTAL']
    }else if (ID_source == 'Cooling Total') {
      ID_source_list =['Cooling Total', 'COOLING_TOTAL']
    }else if (ID_source == 'COOLING FLOW') {
      ID_source_list =['COOLING FLOW']
    }else if (ID_source == 'Supply Temp') {
      ID_source_list =['Supply Temp']
    }else if (ID_source == 'Return Temp') {
      ID_source_list =['Return Temp']
    }



    let number_months   = Number(finalDate2.getFullYear()) > Number(finalDate.getFullYear()) ? 12 - finalDate.getMonth() + finalDate2.getMonth() : finalDate2.getMonth() - finalDate.getMonth()

    //** Submit ajax request
    $.get(address2, (data, status) => {

      let building_list = [];
      for(let i = 0; i < _.size(data); i++){
        qname = data[i].qName
        if(ID_source_list.indexOf(qname) > -1){
          building_list.push(data[i].sName)
        }
      }


      date_string_creator(finalDate, finalDate2, 'Monthly', building_list.join('||'), ID_source, res => {
        _.each(res, n => {
          // console.log('table mat init');
          // console.log(table_mat);
          let tableDictRow = {}
          let table_row     = []
          let table_row2    = []
          let num_table_row = []
          let source_name   = n.sName
          let buildingName =  buildingnames[source_name]
          table_row.push(source_name+' '+buildingName)
          table_row2.push(source_name+' '+buildingName)
          num_table_row.push(source_name)
          tableDictRow['source'] = source_name;

          const val_list  = _.map(n.data, o => o.value)
          const time_list = _.map(n.data, o => o.time)
          let tableDictRowArr = [];
          _.times(number_months + 1, i => {
            num_table_row.push(val_list[i])

            if(i === number_months + 1 && val_list[i] !== null) table_row.push('Good')
            else if(val_list[i] === null){
              table_row.push('Null Value')
              table_row2.push('Null Value')
            }else if( _.includes(String(val_list[i]),'2147')){
              table_row.push('Nonphyiscal')
              table_row2.push('Nonphysical')
            }else if(i) {
              const delta = val_list[i] - val_list[i - 1]
              table_row2.push(String(delta.toFixed(2)))
              table_row.push(`${ String(val_list[i]) }`)
              // table_row.push(`${ String(val_list[i]) }<br> (${ String(delta) })`)
            } else {
              table_row.push(String(val_list[i]))
              table_row2.push('0')
            }

            time_row = ['Account']
            const l = _.size(time_list)
            _.times(l + 1, j => time_row.push(j === l ? 'All' : time_list[j].split(' ')[0]))

            const time_row2 = _.concat('Account', time_list.slice(0, 7))
            tableDictRowArr.push(val_list[i])
            table_mat.push(time_row)
            table_mat2.push(time_row)
            if(!_.size(num_list)) num_list.push(time_row2)
          })

          tableDictRow['data'] = tableDictRowArr
          tableDictRow['Option'] = 'All'
          tableDictRow['timelist'] = time_list[0].data
          table_row.push('All')
          table_mat.push(table_row)
          table_mat2.push(table_row2)
          tableDict.push(tableDictRow)
          num_list.push(num_table_row)
        })

        // let blah = [ [ 1, 2, 3 ], [ 4, 5, 6 ], [7, 8, 9 ] ]
        let blah = [];
        let blah2 = [];
        for( let i = 0, il = _.size(table_mat); i <il; i++){
          if(_.includes(table_mat[i][0], 'Account') && i > 0){
            continue
          }else {
            blah.push(table_mat[i])
            blah2.push(table_mat2[i])
          }
        }
        table_mat = blah;
        table_mat2 = blah2
        // let blah = table_mat
        // console.log(blah);
        html = ''
        if(_.size(html) > 1){
          html = ''
        }

        $("#ibtable tr").remove();
        if(ID_source == 'Condensate' || ID_source == 'Cooling Total'){

          html = '<table class="table table-bordered table-sm" style="width:100%"><thead class="thead-dark"><tr>...</tr></thead><tbody>'

          for(let i = 0, il = _.size(blah); i < il; ++i) {
            html += '<tr onClick="this.bgColor=\'#DDDDDD\'\">'
            for(let j = 0, jl = _.size(blah[i]); j < jl; ++j ) {
              if(_.includes(blah2[i][j+1],'-') && i>0){
                html += '<td bgcolor="#FF6347">' + blah[i][j] + '</td>'
              }
              else if(_.includes(blah2[i][j], '-') && i) {
                html += '<td bgcolor="#FFA500">' + blah[i][j] + '</td>'
              } else if(blah[i][j] === 'Null Value') {
                html += '<td bgcolor="#707070">' + blah[i][j] + '</td>'
              }else if (_.includes(String(blah[i][j]),'Non')) {
                html += '<td bgcolor="#00008B">' + blah[i][j] + '</td>'
              } else{
                html += '<td>' + blah[i][j] + '</td>'
              }
            }
            html += '</tr>'
          }
          html += '</tbody><tfoot><tr>....</tr></tfoot></table>'
          buttonhtml = '<button id=\'btn4\' type=\'button\' class=\'btn btn-warning float-right\'>Filter Data</button>'
          $(html).appendTo('#div1')
          $(buttonhtml).appendTo('#filterbut')


          // Table of deltas
          // let html2 = '<table  class="table table-bordered table-sm" style="width:100%"><caption> Table of changes from month to month </caption><thead thead class="thead-dark"><tr>...</tr></thead><tbody>'
          let html2 = '<table class="table table-bordered table-sm" style="width:50%"><thead class="thead-dark"><tr>...</tr></thead><tbody>'
          for(let i = 0, il = _.size(blah2); i < il; ++i) {
            html2 += '<tr onClick="this.bgColor=\'#DDDDDD\'\">'
            for(let j = 0, jl = _.size(blah2[i]); j < jl; ++j ) {
              if(blah2[i][j] == 'All'){
                continue
              }

              if(_.includes(blah2[i][j], '-') && i) {
                html2 += '<td bgcolor="#FFA500">' + blah2[i][j] + '</td>'
              // } else if(blah[i][j] == 'Null Value') {
              //   html += '<td bgcolor="#707070">' + 'Null Value' + '</td>'
              // }else if (_.includes(String(blah2[i][j]),'Non')) {
              //   html += '<td bgcolor="#00008B">' + blah2[i][j] + '</td>'
              } else{
                html2 += '<td>' + String(blah2[i][j]) + '</td>'
              }
            }
            html2 += '<td>' + 'All' + '</td>'
            html2 += '</tr>'
          }
          html2 += '</tbody><tfoot><tr>....</tr></tfoot></table>'
          // $('<caption> Table of changes from month to month </caption>').appendTo('#div2')
          $(html2).appendTo('#div2')


          //For supply and return temperatures
        }else if(ID_source == 'Supply Temp' || ID_source == 'Return Temp'){
          let html = '<table class="table  table-bordered table-sm" style="width:100%"><thead class="thead-dark"><tr>...</tr></thead><tbody>'

          for(let i = 0, il = _.size(blah); i < il; ++i) {
            html += '<tr onClick="this.bgColor=\'#DDDDDD\'\">'
            for(let j = 0, jl = _.size(blah[i]); j < jl; ++j ) {
              // if(_.includes(blah2[i][j+1],'-') && i>0){
              //   html += '<td bgcolor="#FF6347">' + blah[i][j] + '</td>'
              // }
              // else
              if(Math.abs(blah2[i][j]) > 15 && i) {
                //Huge change in temperatures
                html += '<td bgcolor="#FFA500">' + blah[i][j] + '</td>'
              } else if(blah[i][j] === 'Null Value') {
                html += '<td bgcolor="#707070">' + blah[i][j] + '</td>'
              }else if (_.includes(String(blah[i][j]),'Non') || Number(blah[i][j]) > 100 || Number(blah[i][j]) < 32) {
                //Non-physical temperatures
                html += '<td bgcolor="#00008B">' + blah[i][j] + '</td>'
              } else{
                html += '<td>' + blah[i][j] + '</td>'
              }
            }
            html += '</tr>'
          }
          html += '</tbody><tfoot><tr>....</tr></tfoot></table>'

          $(html).appendTo('#div1')

          // Table of deltas
          let html2 = '<table><caption> Table of changes from month to month </caption><thead><tr>...</tr></thead><tbody>'

          for(let i = 0, il = _.size(blah2); i < il; ++i) {
            html2 += '<tr onClick="this.bgColor=\'#DDDDDD\'\">'
            for(let j = 0, jl = _.size(blah2[i]); j < jl; ++j ) {

              if(Math.abs(blah2[i][j]) > 15 && i) {
                html2 += '<td bgcolor="#FFA500">' + blah2[i][j] + '</td>'
              } else if(blah2[i][j] === 'Null Value') {
                html += '<td bgcolor="#707070">' + blah2[i][j] + '</td>'
              }else if (_.includes(String(blah2[i][j]),'Non')) {
                html += '<td bgcolor="#00008B">' + blah2[i][j] + '</td>'
              } else{
                html2 += '<td>' + blah2[i][j] + '</td>'
              }
            }
            html2 += '</tr>'
          }
          html2 += '</tbody><tfoot><tr>....</tr></tfoot></table>'
          // $('<caption> Table of changes from month to month </caption>').appendTo('#div2')
          $(html2).appendTo('#div2')
        }else if(ID_source == 'COOLING FLOW'){
          let html = '<table class="table  table-bordered table-sm" style="width:100%"><thead class="thead-dark"><tr>...</tr></thead><tbody>'

          for(let i = 0, il = _.size(blah); i < il; ++i) {
            html += '<tr onClick="this.bgColor=\'#DDDDDD\'\">'
            for(let j = 0, jl = _.size(blah[i]); j < jl; ++j ) {
              // if(_.includes(blah2[i][j+1],'-') && i>0){
              //   html += '<td bgcolor="#FF6347">' + blah[i][j] + '</td>'
              // }
              // else
              if(Math.abs(blah2[i][j]) > 500 && i) {
                //Huge change in temperatures
                html += '<td bgcolor="#FFA500">' + blah[i][j] + '</td>'
              } else if(blah[i][j] === 'Null Value') {
                html += '<td bgcolor="#707070">' + blah[i][j] + '</td>'
              }else if (_.includes(String(blah[i][j]),'Non') || Number(blah[i][j]) > 1000 || Number(blah[i][j]) < 0) {
                //Non-physical temperatures
                html += '<td bgcolor="#00008B">' + blah[i][j] + '</td>'
              } else{
                html += '<td>' + blah[i][j] + '</td>'
              }
            }
            html += '</tr>'
          }
          html += '</tbody><tfoot><tr>....</tr></tfoot></table>'

          $(html).appendTo('#div1')

          // Table of deltas
          let html2 = '<table><caption> Table of changes from month to month </caption><thead><tr>...</tr></thead><tbody>'

          for(let i = 0, il = _.size(blah2); i < il; ++i) {
            html2 += '<tr onClick="this.bgColor=\'#DDDDDD\'\">'
            for(let j = 0, jl = _.size(blah2[i]); j < jl; ++j ) {

              if(Math.abs(blah2[i][j]) > 500 && i) {
                html2 += '<td bgcolor="#FFA500">' + blah2[i][j] + '</td>'
              } else if(blah2[i][j] === 'Null Value') {
                html += '<td bgcolor="#707070">' + blah2[i][j] + '</td>'
              }else if (_.includes(String(blah2[i][j]),'Non')) {
                html += '<td bgcolor="#00008B">' + blah2[i][j] + '</td>'
              } else{
                html2 += '<td>' + blah2[i][j] + '</td>'
              }
            }
            html2 += '</tr>'
          }
          html2 += '</tbody><tfoot><tr>....</tr></tfoot></table>'
          // $('<caption> Table of changes from month to month </caption>').appendTo('#div2')
          $(html2).appendTo('#div2')
        }


        // $('<caption> Table of changes from month to month </caption>').appendTo('#div2')
        // https://stackoverflow.com/questions/4998953/get-cell-location
        let table = [].slice.call(document.querySelectorAll('table'))[0]
        let testing = table.querySelectorAll('td')[0].innerHTML;

        // testing[0].innerHTML = 'blah'
        console.log(testing);
        const cells = [].slice.call(table.querySelectorAll('td'))


        for(let i = 1; i <cells.length; i++){
          var cell = cells[i];
          cell.onclick = function(){
            openNav()
            console.log();
            document.getElementsByClassName('hiddendiv')[0].style.display = 'inline'
            let rowIndex      = this.parentNode.rowIndex

            let cellIndex     = this.cellIndex
            cell_location = [rowIndex - 2, cellIndex]
            let all_loc = (cell_location[0]+1)*(cell_location[1]+1)+cell_location[1]



            // let tem_arr       = big_list[rowIndex - 2].data
            let tem_arr       = res[rowIndex - 2].data
            console.log(tem_arr);
            let out_arr       = []
            let num_div       = _.floor(_.size(tem_arr) / 10)
            let building_call = table_mat[rowIndex - 1][0]
            building_call = building_call.substr(0,building_call.indexOf(' '));

            if(table.querySelectorAll('td')[all_loc].innerHTML == 'Filtered'){

              table.querySelectorAll('td')[all_loc].innerHTML = 'Unfiltered'

              for(let i = 1; i <_.size(tableDict); i++){
                if(tableDict[i]['source'] == building_call && tableDict[i]['Option'] == 'All'){
                  let valueArr = tableDict[i]['data'];

                  let blah1 = [{
                    data: tableDict[i]['graphData'],
                    type: 'line',
                    connectNulls:true
                  }]
                  option.series = blah1
                  let blah2 = [{
                    type: 'category',
                    data : tableDict[i]['timelist']
                  }]
                  option.xAxis = blah2
                  if(option && typeof option === 'object'){
                    myChart.setOption(option, true)}

                  for(let k = 1; k <cell_location[1];k++){
                    if(table.querySelectorAll('td')[all_loc-cell_location[1]+k].innerHTML == 'Null Value' || table.querySelectorAll('td')[all_loc-cell_location[1]+k].innerHTML == 'Nonphyiscal' ){
                      // indexClean.push(i-1)
                      // totalLength +=1
                      continue
                    }else{
                    // totalLength +=1

                    table.querySelectorAll('td')[all_loc-cell_location[1]+k].innerHTML = valueArr[k-1]
                    // clean.push(montharrval[i-1])
                    table.querySelectorAll('td')[all_loc-cell_location[1]+k].style.backgroundColor = '#FFFFFF'
                  }
                }

                }
              }
              // Revert row to original series
              return}
              if(table.querySelectorAll('td')[all_loc].innerHTML == 'Unfiltered'){

                table.querySelectorAll('td')[all_loc].innerHTML = 'Filtered'

                for(let i = 1; i <_.size(tableDict); i++){
                  if(tableDict[i]['source'] == building_call && tableDict[i]['Option'] == 'Corrected'){
                    let valueArr = tableDict[i]['data'];
                    // series_list[0]['data'] = tableDict[i]['graphData']
                    console.log(series_list);
                    let blah1 = [{
                      data: tableDict[i]['graphData'],
                      type: 'line',
                      connectNulls:true
                    }]
                    option.series = blah1
                    let blah2 = [{
                      type: 'category',
                      data : tableDict[i]['timelist']
                    }]
                    option.xAxis = blah2


                    if(option && typeof option === 'object'){
                      myChart.setOption(option, true)}


                    for(let k = 1; k <cell_location[1];k++){
                      if(table.querySelectorAll('td')[all_loc-cell_location[1]+k].innerHTML == 'Null Value' || table.querySelectorAll('td')[all_loc-cell_location[1]+k].innerHTML == 'Nonphyiscal' ){
                        // indexClean.push(i-1)
                        // totalLength +=1
                        continue
                      }else{
                      // totalLength +=1

                      table.querySelectorAll('td')[all_loc-cell_location[1]+k].innerHTML = valueArr[k-1]
                      // clean.push(montharrval[i-1])
                      table.querySelectorAll('td')[all_loc-cell_location[1]+k].style.backgroundColor = '#FFFFFF'
                    }
                  }

                  }
                }
                // Revert row to original series


                return}
            if(cellIndex === number_months + 2) {
              _.each(tem_arr, (o, j) => {
                out_arr.push([o.time, o.value])
                if(!array_count) {
                  final_arr.push(['Time', 'Quantity'])
                  array_count = true
                } else final_arr = [['Time', 'Quantity']]
                // console.log(final_arr);
                _.each(out_arr, (p, k) => { let temp_arr = [p[0], Number(p[1])] })

                final_arr2 = final_arr
                let value_arr = _.map(final_arr, (p, k) => { if(k) return p[1] })
                filtered_arr.push(value_arr[0])

                _.each(value_arr, (p, k) => {
                  if(!k) return
                  filtered_arr.push(value_arr[k - 1] > p[i] ? null : p)
                })
                // console.log(value_arr);
                let series_dict = {
                  data: value_arr,
                  type: 'line'
                }


                if(_.size(series_list)) series_list = []
                if(_.size(time_list)) time_list = []
              })

              date_string_creator(finalDate, finalDate2, 'Weekly', building_call, ID_source, res => {
                // console.log(res);
                let hopethisworks = []
                let hopethisworks2 =[]
                let dummylet      = res[0].data

                _.each(dummylet, o => {
                  final_arr.push([o.time, o.value])
                  hopethisworks.push(o.value)
                  hopethisworks2.push(o.time)
                })
                hopethisworks = saturated_filter(hopethisworks,false)
                for(let i = 0; i< _.size(tableDict); i++){
                  if(tableDict[i]['Option'] == 'All' && tableDict[i]['source']== building_call){
                     tableDict[i]['graphData'] = hopethisworks
                     tableDict[i]['timelist'] = hopethisworks2
                  }
                }
                console.log(tableDict);

                series_list.push({
                  data: hopethisworks,
                  type: 'line',
                  connectNulls:true
                })

                time_list.push({
                  type: 'category',
                  data : hopethisworks2
                })

                m(hopethisworks2)
                var dom = document.getElementById('container')
                if(dom.style.display === 'none'){
                  dom.style.display = 'block'}

                  myChart = echarts.init(dom)
                  chart_init = true
                  // let app = {}
                  option = null

                  let value_arr = []
                  let date_arr = []

                  for(let i = 1; i < final_arr.length; i++){
                    value_arr.push(final_arr[i][1])
                    // console.log(final_arr[i]);
                    date_arr.push(final_arr[i][0])
                  }
                  // console.log(value_arr);

                  // console.log(filter_data(series_list,time_list,"Cumulative"));
                  option = {
                    grid:{
                      containLabel : true
                    },

                    title: {
                      left: 'center',
                      text: building_call+' '+ID_source,
                    },


                    tooltip: {
                      trigger: 'axis',
                      position: function (pt) {
                        return [pt[0], '10%'];
                      }
                    },

                    xAxis: time_list,
                    yAxis: {
                      type: 'value',
                      scale: true
                    },
                    series: series_list
                  }
                  $('#btn4').unbind().click(() => {
                    // $('#btn4').on('click', () => {
                    // console.log('SERIES LIST');
                    // console.log(series_list);
                    // let newserieslst = filter_data(series_list,time_list,"Cumulative",building_call)

                    filter_data(series_list,time_list,"Cumulative",ID_source,building_call,'Weekly', res => {
                      console.log('Filter Result');
                      let newserieslst = res
                      console.log(cell_location);
                      console.log(res);
                      console.log(series_list);
                      if(_.size(series_list) > 1){
                        series_list = [series_list[0]]
                        time_series = [time_list[0]]
                      }
                      console.log(series_list);
                      for(let i = 0; i<_.size(series_list[0].data);i++){
                        if(series_list[0].data[i] == null){
                          newserieslst[i]= null
                        }
                      }
                      // console.log('NEW LIST');
                      // console.log(newserieslst);
                      // console.log('Filtered Data Called');

                      series_list.push({
                        data: newserieslst,
                        type: 'line',
                        connectNulls:true
                      })
                      console.log(series_list);
                      time_list.push({
                        type: 'category',
                        data : time_list[0].data
                      })
                      if(option && typeof option === 'object'){
                        myChart.setOption(option, true)}


                        let myTable = document.getElementById('#div1');
                        // console.log('MY TABLE');
                        // console.log(myTable);
                        // myTable.rows[0].cells[1].innerHTML = 'Hello';
                        // console.log(table_mat);
                        // console.log(newserieslst);
                        // console.log(time_list[0].data);
                      })
                    })
                    if(option && typeof option === 'object'){
                      myChart.setOption(option, true)}

                    })
                  } else {
                    let date_call = table_mat[0][cellIndex]
                    // console.log(date_call);
                    let building_call = table_mat[rowIndex - 1][0]
                    building_call = building_call.substr(0,building_call.indexOf(' '));
                    // console.log(building_call);
                    if(date_call[5] == '1' && date_call[6] == '2') {
                      const yr = String(Number(date_call[3]) + 1)
                      date_call2 = date_call[0] + date_call[1] + date_call[2] + yr + date_call[4] + '01' + date_call[7] + date_call[8] + date_call[9]
                    } else if(date_call[6] == '9') {
                      date_call2 = date_call[0] + date_call[1] + date_call[2] + date_call[3] + date_call[4] + '10' + date_call[7] + date_call[8] + date_call[9]
                    } else {
                      let month_mod = String(Number(date_call[6]) + 1)
                      date_call2 = date_call[0] + date_call[1] + date_call[2] + date_call[3] + date_call[4] + date_call[5] + month_mod + date_call[7] + date_call[8] + date_call[9]
                    }
                    // console.log(date_call2);

                    date_call_obj = new Date(date_call);
                    date_call2_obj = new Date(date_call2);

                    // if(_.size(series_list)) series_list = []
                    // console.log(series_list);
                    if(_.size(series_list)) series_list = []
                    if(_.size(time_list)) time_list = []

                    date_string_creator(date_call_obj, date_call2_obj, 'Daily', building_call,ID_source, res => {
                      // console.log(res);
                      let hopethisworks = []
                      let hopethisworks2 =[]
                      let dummylet      = res[0].data
                      // console.log(res[0].data);
                      // date_arr = [];
                      _.each(dummylet, o => {
                        final_arr.push([o.time, o.value])
                        hopethisworks.push(o.value)
                        hopethisworks2.push(o.time)
                      })
                      hopethisworks = saturated_filter(hopethisworks,false)

                      // console.log(date_arr);
                      // console.log(final_arr);

                      series_list.push({
                        data: hopethisworks,
                        type: 'line'
                      })


                      time_list.push({
                        type: 'category',
                        data : hopethisworks2
                      })
                      // console.log('Time list and series list');
                      // console.log(time_list);
                      // console.log(series_list);
                      //New code added ______________________________________________

                      var dom = document.getElementById('container')
                      if(dom.style.display === 'none'){
                        dom.style.display = 'block'}

                        var myChart = echarts.init(dom)
                        chart_init = true
                        // let app = {}
                        option = null

                        let value_arr = []
                        let date_arr = []

                        for(let i = 1; i < final_arr.length; i++){
                          value_arr.push(final_arr[i][1])
                          // console.log(final_arr[i]);
                          date_arr.push(final_arr[i][0])
                        }

                        option = {
                          grid:{
                            containLabel : true
                          },

                          title: {
                            left: 'center',
                            text: building_call+' '+ID_source,
                          },

                          tooltip: {
                            trigger: 'axis',
                            position: function (pt) {
                              return [pt[0], '10%'];
                            }
                          },

                          xAxis: time_list,

                          yAxis: {
                            type: 'value',
                            scale: true
                          },
                          series: series_list

                        }
                        $('#btn4').unbind().click(() => {

                          // $('#btn4').on('click', () => {
                          // console.log('SERIES LIST');
                          // console.log(series_list);
                          filter_data(series_list,time_list,"Cumulative",ID_source,building_call,'Daily', res =>{
                            let newserieslst = res
                            if(_.size(series_list) > 1){
                              series_list = [series_list[0]]
                              time_list = [time_list[0]]
                            }
                            series_list.push({
                              data: newserieslst,
                              type: 'line'
                            })

                            time_list.push({
                              type: 'category',
                              data : time_list[0].data
                            })

                            if(option && typeof option === 'object'){
                              myChart.setOption(option, true)}
                            })

                            if(option && typeof option === 'object'){
                              myChart.setOption(option, true)}

                            })
                            if(option && typeof option === 'object'){
                              myChart.setOption(option, true)}
                            })

                          }

                        }

                      }

                      $('html').toggleClass('loading')
                      $('#datacheck').text("Gathering Data to display on Chart...")
                    })
                  })
                })




                function filter_data(series_list,time_list,source_type,qname,building,weekorday,callback){
                // ;
                let qname_list = []
                if (qname == 'Condensate'){
                  qname_list =['Condensate','COND_TOT(100GAL)','CONDENSATE TOTAL','CONDENSATE_TOTAL(GAL)','A1 HOUSE COND 10GAL','AAW STAD CON 10GAL','EDG CON 10GAL',
                                    'COND #1*100GPM (100GAL)','COND #2*100GPM (100GAL)','CONDENSATE TOT (10*2GAL)','COND_TOT_(100GAL)','094_CONDENSATE1 TOTAL (100GAL)','COND_TOT_GAL10*2(100GAL)',
                                    'COND_TOT (100GAL)','COND RETURN 1','COND RETURN 2','CONDENSATE_TANK(100GAL)','CondensateTot (100GAL)','Condensate1Tot (100GAL)','STEAM TOTAL']
                }else if (qname == 'Cooling Total') {
                  qname_list =['Cooling Total', 'COOLING_TOTAL']}
                console.log(qname_list);
                  console.log('Filtered Data Called');
                  let date = []
                  let dateArr = [];
                  let resetIndexArr = [];
                  // console.log('Series list');
                  // console.log(series_list);
                  // console.log(_.size(series_list[0].data));
                  let series_listsat = saturated_filter(series_list[0].data,true)
                  series_list[0].data = saturated_filter(series_list[0].data,false)
                  // console.log(series_listsat);
                  // creates list of where resets occur. Gives date immediately after the reset

                  for(let i = 0; i< _.size(series_listsat) ;i++){

                    if(series_listsat[i]>series_listsat[i+1]){
                      dateArr.push(time_list[0].data[i+1])
                      resetIndexArr.push(i+1)
                    }
                  }
                  // console.log('Datearr');
                  // console.log(dateArr);
                  datestring = dateArr.join('||')
                  let num = 100
                  if (weekorday == 'Weekly'){
                    num = 800
                  }
                  let address ='https://energywatch.fac.gatech.edu:3000/api/rollcall'+'?bldg='+building+'&num='+String(num)+'&time='+String(datestring);
                  console.log(address);
                  if(cache[address]){
                    return callback(cache[address])
                  }else{

                    $.get(address, (data, status) => {
                      let resetarrs = []
                      let a = data
                      console.log(a);
                      for(let j = 0; j<_.size(a);j++){
                        let quantName = a[j].qName
                        // if(a[j].qName == qname){
                        if(qname_list.indexOf(quantName)>-1){
                          resetarrs.push(_.sortBy(a[j].data,'time'))
                        }
                      }
                      // console.log(resetarrs[0][0].value);
                      // console.log(_.size(resetarrs));
                      let deltaArr =[]
                      let lastGoodNum = resetarrs[0][0].value;
                      console.log('lastGoodNum '+ String(lastGoodNum));
                      console.log(resetarrs);
                      for(let k = 0; k < _.size(resetarrs); k++){
                        let deltatemp = 0
                        for(let l = 0; l<(_.size(resetarrs[k])-1); l++){
                          if(resetarrs[k][l].value != null && String(resetarrs[k][l].value).includes('21474') == false){
                            lastGoodNum = resetarrs[k][l].value
                          }
                          if(lastGoodNum > resetarrs[k][l+1].value){
                             if((resetarrs[k][l+1].value == null && resetarrs[k][l].value == null) ||  (String(resetarrs[k][l].value).includes('21474') == true &&  String(resetarrs[k][l+1].value).includes('21474') == true )){
                               // console.log(resetarrs[k][l].value);
                               continue
                             }else if (resetarrs[k][l+1].value == null && resetarrs[k][l].value != null) {
                                lastGoodNum = resetarrs[k][l].value
                              }else if( String(resetarrs[k][l+1].value).includes('21474') == true  && String(resetarrs[k][l].value).includes('21474') == false){
                                lastGoodNum = resetarrs[k][l].value
                             }else if (resetarrs[k][l+1].value != null && resetarrs[k][l].value == null) {
                               deltatemp = lastGoodNum-resetarrs[k][l+1].value+deltatemp
                             }else if (String(resetarrs[k][l+1].value).includes('21474') == false && String(resetarrs[k][l].value).includes('21474') == true) {
                               deltatemp = lastGoodNum-resetarrs[k][l+1].value+deltatemp
                             }else{                                                         // console.log(resetarrs[k][l].value);
                            deltatemp = resetarrs[k][l].value-resetarrs[k][l+1].value+deltatemp
                            }
                          }

                        }
                        deltaArr.push(deltatemp)
                      }
                      console.log(deltaArr);
                      // console.log(deltaArr);
                      let deltaArrMod = [0];
                      let sumd = 0
                      for(let i = 0; i < _.size(deltaArr); i++){
                        sumd = sumd+deltaArr[i]
                        deltaArrMod.push(sumd)
                      }
                      let finalarr = []
                      let resetTicker = 0

                      for(let i = 0; i<(_.size(series_listsat)-1);i++){
                        finalarr.push(series_listsat[i]+deltaArrMod[resetTicker])
                        if(series_listsat[i]>series_listsat[i+1]){
                          // console.log('Reset detected on main');
                          resetTicker = resetTicker+1
                        }

                      }
                      console.log('Delta Arr');
                      console.log(deltaArrMod);
                      finalarr.push(series_listsat[_.size(series_listsat)-1]+deltaArrMod[deltaArrMod.length-1])
                      // console.log('FINAL ARRAY');
                      // console.log(finalarr);
                      cache[address] = finalarr
                      for(let i = 0; i<_.size(finalarr);i++){
                        if(isNaN(finalarr[i])){
                          finalarr[i] = null
                        }
                      }

                      if(_.size(html3) == 0){
                      html3 += '<table><caption> Corrected Table </caption><thead><tr>...</tr></thead><tbody>'

                      }


                      html3 += '<tr onClick="this.bgColor=\'#DDDDDD\'\">'

                      // html3 += '<td>' + 'account' + '</td>'
                      // html3 += '<td>' + String(time_list[0].data[0]) + '</td>'
                      let counterarr = []

                      let accntStr = ''
                      accntStr += '<td>' + 'Account' + '</td>'
                      accntStr += '<td>' + String(time_list[0].data[0]) + '</td>'

                      for(let j = 1, jl = _.size(finalarr); j < jl; j++ ) {
                        let tempdate1 = new Date(time_list[0].data[j])
                        let tempdate2 = new Date(time_list[0].data[j-1])
                        // console.log(tempdate);
                        if(tempdate1.getMonth() != tempdate2.getMonth()){
                          accntStr += '<td>' + String(time_list[0].data[j]) + '</td>'
                          counterarr.push(j)
                        }
                      }

                      if(html3.includes('Account') == false){
                        html3 += accntStr
                      }

                      let valueStr = ''
                      valueStr += '</tr>'
                      valueStr += '<td>' + String(building) + '</td>'
                      valueStr += '<td>' + finalarr[0] + '</td>'
                      let montharrval = [finalarr[0]]
                      for(let j = 0, jl = _.size(finalarr); j < jl; j++ ) {
                        if(counterarr.includes(j)){
                          valueStr += '<td>' + finalarr[j] + '</td>'
                          montharrval.push(finalarr[j])
                        }
                      }
                      //
                      valueStr += '</tr>'

                      if(html3.includes('</tbody><tfoot><tr>....</tr></tfoot></table>') == false){
                        html3 += valueStr
                        html3 += '</tbody><tfoot><tr>....</tr></tfoot></table>'
                      }else{
                        let pos = html3.indexOf('</tbody><tfoot><tr>....</tr></tfoot></table>')
                        html3 = [html3.slice(0, pos), valueStr, html3.slice(pos)].join('')
                      }


                      // console.log('STUFF FROM RESET FILTER FUNCTION');

                      let table = [].slice.call(document.querySelectorAll('table'))[0]
                      // console.log(cell_location[0]);
                      console.log(table);
                      let all_loc = (cell_location[0]+1)*(cell_location[1]+1)+cell_location[1]
                      let clean =[];
                      let indexClean = []
                      let totalLength = 0


                      if(table.querySelectorAll('td')[all_loc].innerHTML == 'All'){

                      table.querySelectorAll('td')[all_loc].innerHTML = 'Filtered'

                      table.querySelectorAll('td')[all_loc].style.backgroundColor = '#7FFF00'

                      console.log('CELL LOCATION');
                      console.log(cell_location);

                      // ;

                      for(let i = 1; i <cell_location[1];i++){

                        if(table.querySelectorAll('td')[all_loc-cell_location[1]+i].innerHTML == 'Null Value' || table.querySelectorAll('td')[all_loc-cell_location[1]+i].innerHTML == 'Nonphyiscal' ){
                          indexClean.push(i-1)
                          totalLength +=1

                          continue
                        }else{
                        totalLength +=1
                        table.querySelectorAll('td')[all_loc-cell_location[1]+i].innerHTML = String(montharrval[i-1])
                        clean.push(montharrval[i-1])
                        table.querySelectorAll('td')[all_loc-cell_location[1]+i].style.backgroundColor = '#FFFFFF'
                            }
                          }
                        //
                      }
                      let error_indicator = false

                      console.log('CLEANED THINGY');
                      console.log(clean);
                      for(let j = 0; j<_.size(clean)-1;j++){
                        if(clean[j]>clean[j+1]){
                          console.log('bad point detected');
                          console.log(clean[j]);
                          error_indicator = true}
                        // }
                        if(clean[j] === 0){
                          console.log('bad point detected');
                          console.log(clean[j]);
                          error_indicator = true
                        }

                      }
                      console.log('ERROR INDICATOR STATUS');
                      console.log(error_indicator);
                      if(error_indicator == true){
                        table.querySelectorAll('td')[all_loc-cell_location[1]].style.backgroundColor = '#B22222'
                      }
                      console.log(indexClean);
                      cleanFilter = []
                      let cleanedArr = []
                      let deltaErr = 0

                      // ;
                      let finalarrCleaned = [];
                      if(error_indicator == true){
                        for(let i =0; i<_.size(clean)-1; i++){
                          cleanFilter.push(clean[i]+deltaErr)
                          if(clean[i]>clean[i+1]){
                            deltaErr = clean[i]-clean[i+1] + deltaErr
                          }

                        }
                        cleanFilter.push(clean[_.size(clean)]+deltaErr)
                        for(i = 0; i<_.size(cleanFilter); i++){
                          if(indexClean.includes(i)){
                            // cleanedArr.push(null)
                            cleanFilter.splice(i, 0, null);
                            for(let j =0; j<_.size(indexClean);j++){
                              if(indexClean[j] == i){
                                delete indexClean[j]
                              }
                            }
                            i = i-1
                            // cleanedArr.push(cleanFilter[i])
                          }else{
                            cleanedArr.push(cleanFilter[i])
                          }
                        }

                        for(let i = 1; i <cell_location[1];i++){
                          if(table.querySelectorAll('td')[all_loc-cell_location[1]+i].innerHTML == 'Null Value' || table.querySelectorAll('td')[all_loc-cell_location[1]+i].innerHTML == 'Nonphyiscal' ){
                            // indexClean.push(i-1)
                            // totalLength +=1
                            continue
                          }else{
                          // totalLength +=1
                          table.querySelectorAll('td')[all_loc-cell_location[1]+i].innerHTML = String(cleanedArr[i-1])
                          // clean.push(montharrval[i-1])
                          table.querySelectorAll('td')[all_loc-cell_location[1]+i].style.backgroundColor = '#FFFFFF'
                          //
                              }
                            }


                        let finalarrNullInd = [];
                        let finalArrDelta = 0;
                        for(let i = 0; i<_.size(finalarr);i++){
                          if(finalarr[i]==0){
                            // Recording null points in final array
                            finalarrNullInd.push(i);
                          }
                        }
                        let deltaFin = 0;
                        for(let i = 0; i<_.size(finalarr)-1;i++){
                          finalarrCleaned.push(finalarr[i]+finalArrDelta);
                          if(finalarr[i]>finalarr[i+1]){
                            deltaFin = finalarr[i]-finalarr[i+1]
                            finalArrDelta = finalArrDelta+deltaFin
                          }
                        }
                        finalarrCleaned.push(finalarr[_.size(finalarr)-1]+finalArrDelta)

                        for(j=0;j<_.size(finalarrCleaned);j++){
                          if(finalarrNullInd.includes(j)){
                            finalarrCleaned[j] = null;
                          }
                        }
                      finalarr = finalarrCleaned;






                      }
                      console.log(finalarrCleaned);
                      counterarr = []

                      accntStr = ''
                      accntStr += '<td>' + 'Account' + '</td>'
                      accntStr += '<td>' + String(time_list[0].data[0]) + '</td>'

                      for(let j = 1, jl = _.size(finalarr); j < jl; j++ ) {
                        let tempdate1 = new Date(time_list[0].data[j])
                        let tempdate2 = new Date(time_list[0].data[j-1])
                        // console.log(tempdate);
                        if(tempdate1.getMonth() != tempdate2.getMonth()){
                          accntStr += '<td>' + String(time_list[0].data[j]) + '</td>'
                          counterarr.push(j)
                        }
                      }

                      if(html3.includes('Account') == false){
                        html3 += accntStr
                      }

                      valueStr = ''
                      valueStr += '</tr>'
                      valueStr += '<td>' + String(building) + '</td>'
                      valueStr += '<td>' + finalarr[0] + '</td>'
                      montharrval = [finalarr[0]]
                      for(let j = 0, jl = _.size(finalarr); j < jl; j++ ) {
                        if(counterarr.includes(j)){
                          valueStr += '<td>' + finalarr[j] + '</td>'
                          montharrval.push(finalarr[j])
                        }
                      }
                      let tableDictRow = {};
                      tableDictRow['source'] = building;
                      tableDictRow['Option'] = 'Corrected'
                      let tableDictRowArr = [];
                      for(let i = 0; i< _.size(montharrval);i++){
                        tableDictRowArr.push(montharrval[i])
                      }
                      valueStr += '</tr>'
                      tableDictRow['data'] = tableDictRowArr
                      tableDictRow['timelist'] = time_list[0].data

                      for(let i = 1; i <cell_location[1];i++){
                        if(table.querySelectorAll('td')[all_loc-cell_location[1]+i].innerHTML == 'Null Value' || table.querySelectorAll('td')[all_loc-cell_location[1]+i].innerHTML == 'Nonphyiscal' ){
                          // indexClean.push(i-1)
                          // totalLength +=1
                          continue
                        }else{
                        // totalLength +=1
                        table.querySelectorAll('td')[all_loc-cell_location[1]+i].innerHTML = String(montharrval[i-1])
                        // clean.push(montharrval[i-1])
                        table.querySelectorAll('td')[all_loc-cell_location[1]+i].style.backgroundColor = '#FFFFFF'
                         //
                            }
                          }
                      //
                      // $(html3).appendTo('#div3')
                      tableDictRow['graphData'] = finalarr
                      tableDict.push(tableDictRow)
                      // console.log(tableDict);
                      console.log('FINAL ARRAY');
                      console.log(finalarr);
                      table2update()

                      return callback(finalarr)
                    })
                  }

                }

                function table2update(){

                  let table = [].slice.call(document.querySelectorAll('table'))[0]
                  let blah = [].slice.call(document.querySelectorAll('table'))[3]
                  let dCells = [].slice.call(blah.querySelectorAll('td'))
                  // for(let i = 0; i<_.size(dCells);i++){
                  //   dCells[i].innerHTML = 'blah'
                  // }
                  let all_loc = (cell_location[0]+1)*(cell_location[1]+1)+cell_location[1]

                  let arr_thing = [];
                  let darr_thing =[0,];

                  for(let i = 1; i <cell_location[1];i++){
                        arr_thing.push(table.querySelectorAll('td')[all_loc-cell_location[1]+i].innerHTML)
                      }
                  let goodnum = 0;
                  for(let i = 1; i<_.size(arr_thing);i++){
                    if(arr_thing[i] == 'Null Value' || arr_thing[i] == 'Nonphyiscal'){
                      darr_thing.push('Null')
                    }else{
                      let delta = Number(arr_thing[i])-Number(arr_thing[i-1])
                      darr_thing.push(delta)
                        }

                  }
                  let count = 0
                  for(let i = 1; i <cell_location[1];i++){
                    if(table.querySelectorAll('td')[all_loc-cell_location[1]+i].innerHTML == 'Null Value' || table.querySelectorAll('td')[all_loc-cell_location[1]+i].innerHTML == 'Nonphyiscal' ){
                      // indexClean.push(i-1)
                      // totalLength +=1
                      count +=1
                      continue
                    }else{
                    // totalLength +=1
                    blah.querySelectorAll('td')[all_loc-cell_location[1]+i].innerHTML = String(darr_thing[count])
                    // clean.push(montharrval[i-1])
                    blah.querySelectorAll('td')[all_loc-cell_location[1]+i].style.backgroundColor = '#FFFFFF'
                    count+=1
                    //
                        }
                      }

                }
              })

              function date_string_creator(date, date2, divs, bldgs, ID_source, fn) {
                //** fn is the callback function
                let date2new = new Date(date2.getFullYear(),date2.getMonth(), date2.getDay()+7)
                // console.log(date2new);
                let all_building_str = _.size(bldgs) ? '&bldg='+bldgs : ''
                //** Where divs is the division type to be used. Should be either 'Daily', 'Monthly', or 'Weekly'
                //** Date1 is the start date (earlier) and date2 is the end date(later)


                let date_list     = []
                let big_data_list = []
                let month2        = date2.getMonth()
                let month         = date.getMonth()
                let num           = month2 - month
                let day           = date.getDate()
                let day2          = date2.getDate()
                let year          = date.getFullYear()
                let year2         = date2.getFullYear()
                let date_str      = `${ year }-${ String(Number(month) + 1) }-${ day }`
                let value_list    = []
                let original_list = []
                let tot_time_str  = ''
                let big_arr       = []
                let quant_list
                let list_data
                let ID_source_list = [];
                if (ID_source == 'Condensate'){
                  ID_source_list =['Condensate','COND_TOT(100GAL)','CONDENSATE TOTAL','CONDENSATE_TOTAL(GAL)','A1 HOUSE COND 10GAL','AAW STAD CON 10GAL','EDG CON 10GAL',
                                    'COND #1*100GPM (100GAL)','COND #2*100GPM (100GAL)','CONDENSATE TOT (10*2GAL)','COND_TOT_(100GAL)','094_CONDENSATE1 TOTAL (100GAL)','COND_TOT_GAL10*2(100GAL)',
                                    'COND_TOT (100GAL)','COND RETURN 1','COND RETURN 2','CONDENSATE_TANK(100GAL)','CondensateTot (100GAL)','Condensate1Tot (100GAL)','STEAM TOTAL']
                }else if (ID_source == 'Cooling Total') {
                  ID_source_list =['Cooling Total', 'COOLING_TOTAL']
                }else if (ID_source == 'COOLING FLOW') {
                  ID_source_list =['COOLING FLOW']
                }else if (ID_source == 'Supply Temp') {
                  ID_source_list =['Supply Temp']
                }else if (ID_source == 'Return Temp') {
                  ID_source_list =['Return Temp']
                }

                if(divs === 'Daily') {
                  date_list.push(date_str)
                  _.times(1000, i => {
                    day += 1
                    let d = new Date(year, month, day)
                    if(d > date2) return false
                    let day_str = d.getDate()
                    let month_str = d.getMonth()
                    let year_str = d.getFullYear()
                    let new_date_str = `||${ year_str }-${ String(Number(month_str + 1)) }-${ day_str }`
                    // console.log(new_date_str);
                    date_list.push(new_date_str)
                  })
                } else if(divs === 'Weekly') {
                  date_list.push(date_str)
                  _.times(1000, i => {
                    day += 7
                    let d = new Date(year, month, day)
                    // if(d > date2) return false
                    let day_str = d.getDate()
                    let month_str = d.getMonth()
                    let year_str = d.getFullYear()
                    let new_date_str = `||${ year_str }-${ String(Number(month_str + 1)) }-${ day_str }`
                    if(d > date2new) return false
                    // console.log(new_date_str);
                    date_list.push(new_date_str)
                  })
                } else if(divs === 'Monthly') {
                  date_list.push(date_str)
                  let d = new Date(year,month,day)
                  _.times(1000, i => {
                    month += 1
                    let d = new Date(year, month, day)
                    if(d > date2) return false
                    let day_str = d.getDate()
                    let month_str = d.getMonth()
                    let year_str = d.getFullYear()
                    let new_date_str = `||${ year_str }-${ String(Number(month_str + 1)) }-${ day_str }`
                    // console.log(new_date_str);
                    date_list.push(new_date_str)
                  })
                }
                console.log(divs);
                console.log('date string');
                console.log(date_list);

                let date_str_all = date_list.join('')
                let address = `https://energywatch.fac.gatech.edu:3000/api/rollcall?time=${ date_str_all }${ all_building_str }`

                m('Ajax request --> ', address)
                $.get(address, (data, status) => {
                  let original_list = data
                  let dummy_list = [];
                  for(i = 0; i < _.size(original_list); i++){
                    // console.log(_.size(original_list[i]));
                    if(_.size(original_list[i]) < 6){
                      dummy_list.push(original_list[i])
                    }
                  }
                  // console.log(dummy_list);
                  original_list = dummy_list
                  // console.log(original_list);
                  // let quant_list = _.filter(original_list, n => (n.qName == ID_source))

                  let quant_list = _.filter(original_list, n => ((ID_source_list.indexOf(n.qName)>-1)))

                  // console.log(quant_list);
                  // console.log(quant_list[0].data[0]);
                  let list_data = _.map(quant_list, n => [n.data[0], n.sName])

                  _.each(quant_list, n => {
                    _.each(list_data, o => {
                      // if(n.sName === o[1] && n.qName === ID_source) n.data.push(o[0])
                      if(n.sName === o[1] && ID_source_list.indexOf(n.qName)>-1) n.data.push(o[0])
                    })
                  })

                  quant_list = _.sortBy(quant_list, 'sName')

                  big_arr = _.concat(quant_list[0], _.filter(quant_list, (n, i) => i && n.sName !== quant_list[i - 1].sName))

                  _.each(big_arr, n => {
                    n.data = _.sortBy(n.data, 'time')
                    n.data = _.uniqBy(n.data)
                  })
                  console.log('big arr');
                  console.log(big_arr);
                  return fn(big_arr)
                })
              }


              function saturated_filter(arr,filter){
                let newarr = []
                for(let i = 0; i<_.size(arr); i++){
                  if(arr[i]==21474508.79 || arr[i]==-21474508.79 || arr[i]== -21473198.06 ||arr[i] == 2147450879){
                    if(filter == false){
                    newarr.push(null)}
                    else{
                      newarr.push(0)
                    }
                  }else{
                    newarr.push(arr[i])
                  }
                }

                return newarr
                // return arr
              }



              function myFunction() {
                $( "#table2" ).hide( "slow", function() {
                  alert( "Animation complete." );
                });
              }


              $( "#clickme" ).click(function() {
                $( "#table2" ).hide( "slow", function() {
                  alert( "Animation complete." );
                });
              });


              function m(...x) { return console.log(...x) }
              function json(x) { return JSON.stringify(x) }
