const subCategoryJsonData = require('./SubCategory.json');

export const SubCategory = () => {
    const categories = subCategoryJsonData.data[0].categories.map((category:any)=> ({
        cat_id: 1,
        name: category.name,
        min_price: 0,
    }));
    return JSON.stringify(subCategoryJsonData);
}