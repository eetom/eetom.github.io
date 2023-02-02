$(function() {
  var scntDiv = $('#filters');
  var i = $('#filters p').size() + 1;
  
  $('#addScnt').live('click', function() {
    $('<p class="filter-item"><label for="p_scnts" class="filters"><select> <option value="default">AND</option> <option value="OR">OR</option> <option value="XOR">XOR</option> <option value="NOT">NOT</option> </select> &nbsp; <select> <option value="default">Select one ..</option> <option value="ip">IP Addresses</option> <option value="asn">ASN</option> <option value="bots">Bot Classifications</option> <option value="hosts">Hosts</option> <option value="requesturi">Request URI</option> <option value="country">Country Code</option> <option value="useragent">User Agent</option> <option value="threatlvl">Threat Level</option> </select> <select> <option value="IS">IS</option> <option value="NOT">IS NOT</option> <option value="Greater">IS GREATER THAN</option> <option value="LESSER">IS LESSER THAN</option> <option value="CONTAINS">CONTAINS</option> </select> <input type="text" id="p_scnt" size="20" name="p_scnt" value="" placeholder="select one .." /> </label> <a href="#" id="remScnt"><i class="fas fa-times"></i></a></p>').appendTo(scntDiv);
    i++;
    return false;
  });
  
  $('#remScnt').live('click', function() { 
    if( i > 2 ) {
      $(this).parents('p').remove();
      i--;
    }
    return false;
  });
});