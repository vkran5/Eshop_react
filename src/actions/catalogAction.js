export const categoryAction = (data) => {
    console.log(data , 'category');
    return {
        type: 'SHOW_CATEGORY',
        payload: data
    }
} 