const nullResponseCallData = (message = 'NOT OK') => {
  console.log(message);
  return {
    httpcode: 0,
    code: -1,
    message,
    data: {}
  }
}

const fillResponseCallData = (data, message = 'OK') => {
  console.log(message);
  return {
    httpcode: 0,
    code: -1,
    message,
    data
  }
}

exports.DataProcess = function (data, message) {
  if (data) {
    return fillResponseCallData(data, message);
  } else {
    return nullResponseCallData(message);
  }
}

exports.DataProcessByDB = async function (content, query, func1, func2) {
  if (!content) {
    const res =  await func1(query, func2);
    return fillResponseCallData(res, 'OK AND FROM WEB')
  } else {
    return fillResponseCallData(content, 'OK AND FROM LOCAL')
  }
}
