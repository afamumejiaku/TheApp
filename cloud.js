function main(input) {
  //Get Input data with details from reader function
  $("div.spanner").addClass("show");
  $("div.overlay").addClass("show");
  Wordout = getData(input.data)
  Wordout.then(function (result) {
    // Setting height and width with margins       
    var margin = {top: 2, right: 2, bottom: 2, left: 2},
           w = 1500 - margin.left - margin.right,
           h = 750 - margin.top - margin.bottom;
    // create the svg
    var svg = d3.select(input.container).append("svg")
              .attr('height', h + margin.top + margin.bottom)
              .attr('width', w + margin.left + margin.right)
    // set the ranges for the scales
    var wordScale = d3.scaleLinear().range([10, 100]);
    // set the display on HTML
    var focus = svg.append('g')
                 .attr("transform", "translate(" + [w/2, h/2+margin.top] + ")")
    //Set the parameters for the word cloud layout
    var layout = d3.layout
     .cloud()
     .size([w, h])
     .words(
      result.map(function (d) {
        return {
            text: d.text,
            size: d.size,
            color: d.color,
          }
        })
      )
      .padding(0)
      //.rotate(function () {        return ~~(Math.random() * 2) * 90      })
      .font('Impact')
      .fontSize(function (d) {
        return d.size * 15
        })
      .on('end', draw)
    // draw the layout
    layout.start()
    // Function to call Colour
    function fillColor(d) {
      return d.color
     }
    // function called by layout to draw words
    function draw(words) {
      $("div.spanner"). removeClass("show");
      $("div.overlay"). removeClass("show");
      focus.selectAll("text")
        .data(words)
        .enter()
        .append('text')
        .style('font-size', function (d) {
          return d.size + 'px'
         })
        .style('font-family', 'Impact')
        .attr('text-anchor', 'middle')
        .style('fill', fillColor)
        .attr('transform', function (d) {
          return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')'
        })
        .text(function (d) {
          return d.text
        })
      .on('click', Click)
    }
      // Parameters to draw table
      var tablenum = 1 
      var tablenumstring 
      var tablename
      //Click function Below
      async function Click(d) {
        // Generate meaning of word 
        var data1 = await wiki(d.text)
        var data2
        for (i = 0; i < 6; i++) {
          if(i == 0){data2 = data1[i];}
          else{data2 = data1[i] + '&nbsp;'+ '&nbsp;'+ '<i>' + data1[5+i] + '</i>'+ "<br>";}
        //Append meaning of word    
        var mydata = $("<div>").html(data2);
           $(input.container2).append(mydata)
        }
        // Call Data again to generate Table of Items
        await originalData().then(data => {
          try {
          //Try and sort by date if available
          data = data.sort((a, b) => new Date (a.date) - new Date (b.date));
          } catch (error) {
          console.log("Can't find Date");
          }
          // Determining Table name and count parameters
          tablenumstring = tablenum.toString();
          tablename = d.text.concat(tablenumstring)
          tablenum += tablenum +1
           var count = 0 ,textcon, datecon
          // Function to Append rows into tables
          function myFunction(textcon, datecon, tablename) {
            var table = document.getElementById(tablename);
            var row = table.insertRow(count);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = textcon;
            cell2.innerHTML = datecon;
          }
          for (i = 0; i < data.length; i++) {
            var content = data[i]["text"]
            if(Array.isArray(content)){
              content = content.join()
            }
            let value = analyse(content)
            content = content.replace(/[^a-zA-Z ]/g, ' ')
            content = content.replace(/  +/g, ' ')
            let words = content.trim().split(' ').map((w) => w.toLowerCase())
            for (let word in words) {
              if (words[word] == d.text) {
                if(count==0){  
                  if (value < 0) {$(input.container2).append('<table id=' + tablename +'><tr> <th style="color:Black ;margin:0;padding:0"> <em>' + "Text" + '</em></th> <th style="color:Black ;margin:0;padding:0;float:right"> <em>' + "Date" + '</em></th> </tr><tr><td style="color:Tomato;margin:0;padding:0"> <em>' + data[i]["text"] + '</em></td> <td style="color:Tomato;margin:0;padding:0;float:right"> <em>' + data[i]["date"] + '</em></td> </tr> </table>' )}
                  else if (value === 0) {$(input.container2).append('<table id=' + tablename +' ><tr> <th style="color:Black ;margin:0;padding:0"> <em>' + "Text" + '</em></th> <th style="color:Black ;margin:0;padding:0;float:right"> <em>' + "Date" + '</em></th> </tr><tr><td style="color:Black;margin:0;padding:0"> <em>' + data[i]["text"] + '</em></td> <td style="color:Black;margin:0;padding:0;float:right"> <em>' + data[i]["date"] + '</em></td> </tr> </table>' )}
                  else if (value > 0) {$(input.container2).append('<table id=' + tablename +'><tr> <th style="color:Black ;margin:0;padding:0"> <em>' + "Text" + '</em></th> <th style="color:#Black ;margin:0;padding:0;float:right"> <em>' + "Date" + '</em></th> </tr><tr><td style="color:MediumSeaGreen;margin:0;padding:0"> <em>' + data[i]["text"] + '</em></td> <td style="color:MediumSeaGreen;margin:0;padding:0;float:right"> <em>' + data[i]["date"] + '</em></td> </tr> </table>' )}
                  count += 1
                }
                else {
                  if (value < 0) {textcon = '<p style="color:Tomato;margin:0;padding:0"> <em>' + data[i]["text"] + '</em></p>'}
                  else if (value === 0) {textcon = '<p style="color:Black;margin:0;padding:0"> <em>' + data[i]["text"] + '</em></p>'}
                  else if (value > 0) {textcon = '<p style="color:MediumSeaGreen;margin:0;padding:0"> <em>' + data[i]["text"] + '</em></p>'}
                  // Add Date
                  if (value < 0) {datecon = '<p style="color:Tomato;margin:0;padding:0"> <em>' + data[i]["date"] + '</em></p>'}
                  else if (value === 0) {datecon = '<p style="color:Black;margin:0;padding:0"> <em>' + data[i]["date"] + '</em></p>'}
                  else if (value > 0) {datecon = '<p style="color:MediumSeaGreen;margin:0;padding:0"> <em>' + data[i]["date"] + '</em></p>'}
                  myFunction(textcon, datecon, tablename)
                }
              }
              function exportTableToCSV(filename) {
                var csv = [];
                var rows = document.querySelectorAll("table tr");
                for (var i = 0; i < rows.length; i++) {
                  var row = [], cols = rows[i].querySelectorAll("td, th");
                for (var j = 0; j < cols.length; j++) 
                  row.push(cols[j].innerText);
                csv.push(row.join(","));        
                }
                // Download CSV file
                downloadCSV(csv.join("\n"), filename);
              }
            }
          }
        })
      }
  })
}