export const productDetailAction = (data) => {
    console.log('ini data product', data);

    return {
        type : "SHOW_DETAILS",
        payload : data
    }
}

