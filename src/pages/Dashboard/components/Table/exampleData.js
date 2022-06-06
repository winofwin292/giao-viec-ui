function createData(name, calories, fat, carbs, protein) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        history: [
            {
                date: '2020-01-05',
                customerId: '11091700',
                amount: 3,
            },
            {
                date: '2020-01-02',
                customerId: 'Anonymous',
                amount: 1,
            },
        ],
    };
}

const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
];

const dl_mau = [
    {
        ID: 4,
        TEN_CV: 'Tạo kết nối CSDL',
        TEN_NGUOI_TAO: 'Nguyễn Trung Thật',
        LOAI_CV: 'Chỉnh sửa phần mềm',
        TG_TAO: 'Mon Jun 06 2022 09:00:00',
        TG_HET_HAN: 'Mon Jun 13 2022 00:00:00',
    },
    {
        ID: 5,
        TEN_CV: 'Cập nhật dữ liệu lên CSDL',
        TEN_NGUOI_TAO: 'Nguyễn Trung Thật',
        LOAI_CV: 'Cập nhật dữ liệu',
        TG_TAO: 'Mon Jun 06 2022 09:00:00',
        TG_HET_HAN: 'Wed Jun 15 2022 00:00:00',
    },
];

export { rows, dl_mau };
