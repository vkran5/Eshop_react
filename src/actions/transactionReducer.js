export const transactionAction = (data) => {
    console.log('ini data transaction', data);
    return {
        type: "SHOW_TRANSACTION",
        payload: data
    }
}