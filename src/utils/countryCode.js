const rawData = [
    { short: 'AD', name: '安道尔共和国', en: 'Andorra', code: '+376', groupEn: 'A', groupCn: 'A', },
    { short: 'AE', name: '阿拉伯联合酋长国', en: 'UnitedArabEmirates', code: '+971', groupEn: 'A', groupCn: 'A', },
    { short: 'AF', name: '阿富汗', en: 'Afghanistan', code: '+93', groupEn: 'A', groupCn: 'A', },
    { short: 'AG', name: '安提瓜和巴布达', en: 'AntiguaandBarbuda', code: '+1268', groupEn: 'A', groupCn: 'A', },
    { short: 'AI', name: '安圭拉岛', en: 'Anguilla', code: '+1264', groupEn: 'A', groupCn: 'A', },
    { short: 'AL', name: '阿尔巴尼亚', en: 'Albania', code: '+355', groupEn: 'A', groupCn: 'A', },
    { short: 'AM', name: '亚美尼亚', en: 'Armenia', code: '+374', groupEn: 'A', groupCn: 'Y', },
    { short: '', name: '阿森松', en: 'Ascension', code: '+247', groupEn: 'A', groupCn: 'A', },
    { short: 'AO', name: '安哥拉', en: 'Angola', code: '+244', groupEn: 'A', groupCn: 'A', },
    { short: 'AR', name: '阿根廷', en: 'Argentina', code: '+54', groupEn: 'A', groupCn: 'A', },
    { short: 'AT', name: '奥地利', en: 'Austria', code: '+43', groupEn: 'A', groupCn: 'A', },
    { short: 'AU', name: '澳大利亚', en: 'Australia', code: '+61', groupEn: 'A', groupCn: 'A', },
    { short: 'AZ', name: '阿塞拜疆', en: 'Azerbaijan', code: '+994', groupEn: 'A', groupCn: 'A', },
    { short: 'BB', name: '巴巴多斯', en: 'Barbados', code: '+1246', groupEn: 'B', groupCn: 'B', },
    { short: 'BD', name: '孟加拉国', en: 'Bangladesh', code: '+880', groupEn: 'B', groupCn: 'M', },
    { short: 'BE', name: '比利时', en: 'Belgium', code: '+32', groupEn: 'B', groupCn: 'B', },
    { short: 'BF', name: '布基纳法索', en: 'Burkina-faso', code: '+226', groupEn: 'B', groupCn: 'B', },
    { short: 'BG', name: '保加利亚', en: 'Bulgaria', code: '+359', groupEn: 'B', groupCn: 'B', },
    { short: 'BH', name: '巴林', en: 'Bahrain', code: '+973', groupEn: 'B', groupCn: 'B', },
    { short: 'BI', name: '布隆迪', en: 'Burundi', code: '+257', groupEn: 'B', groupCn: 'B', },
    { short: 'BJ', name: '贝宁', en: 'Benin', code: '+229', groupEn: 'B', groupCn: 'B', },
    { short: 'BL', name: '巴勒斯坦', en: 'Palestine', code: '+970', groupEn: 'B', groupCn: 'B', },
    { short: 'BM', name: '百慕大群岛', en: 'BermudaIs.', code: '+1441', groupEn: 'B', groupCn: 'B', },
    { short: 'BN', name: '文莱', en: 'Brunei', code: '+673', groupEn: 'B', groupCn: 'W', },
    { short: 'BO', name: '玻利维亚', en: 'Bolivia', code: '+591', groupEn: 'B', groupCn: 'B', },
    { short: 'BR', name: '巴西', en: 'Brazil', code: '+55', groupEn: 'B', groupCn: 'B', },
    { short: 'BS', name: '巴哈马', en: 'Bahamas', code: '+1242', groupEn: 'B', groupCn: 'B', },
    { short: 'BW', name: '博茨瓦纳', en: 'Botswana', code: '+267', groupEn: 'B', groupCn: 'B', },
    { short: 'BY', name: '白俄罗斯', en: 'Belarus', code: '+375', groupEn: 'B', groupCn: 'B', },
    { short: 'BZ', name: '伯利兹', en: 'Belize', code: '+501', groupEn: 'B', groupCn: 'B', },
    { short: 'CA', name: '加拿大', en: 'Canada', code: '+1', groupEn: 'C', groupCn: 'J', },
    { short: '', name: '开曼群岛', en: 'CaymanIs.', code: '+1345', groupEn: 'C', groupCn: 'K', },
    { short: 'CF', name: '中非共和国', en: 'CentralAfricanRepublic', code: '+236', groupEn: 'C', groupCn: 'Z', },
    { short: 'CG', name: '刚果', en: 'Congo', code: '+242', groupEn: 'C', groupCn: 'G', },
    { short: 'CH', name: '瑞士', en: 'Switzerland', code: '+41', groupEn: 'C', groupCn: 'R', },
    { short: 'CK', name: '库克群岛', en: 'CookIs.', code: '+682', groupEn: 'C', groupCn: 'K', },
    { short: 'CL', name: '智利', en: 'Chile', code: '+56', groupEn: 'C', groupCn: 'Z', },
    { short: 'CM', name: '喀麦隆', en: 'Cameroon', code: '+237', groupEn: 'C', groupCn: 'K', },
    { short: 'CN', name: '中国', en: 'China', code: '+86', groupEn: 'C', groupCn: 'Z', },
    { short: 'CO', name: '哥伦比亚', en: 'Colombia', code: '+57', groupEn: 'C', groupCn: 'G', },
    { short: 'CR', name: '哥斯达黎加', en: 'CostaRica', code: '+506', groupEn: 'C', groupCn: 'G', },
    { short: 'CU', name: '古巴', en: 'Cuba', code: '+53', groupEn: 'C', groupCn: 'G', },
    { short: 'CY', name: '塞浦路斯', en: 'Cyprus', code: '+357', groupEn: 'C', groupCn: 'S', },
    { short: 'CZ', name: '捷克', en: 'CzechRepublic', code: '+420', groupEn: 'C', groupCn: 'J', },
    { short: 'DE', name: '德国', en: 'Germany', code: '+49', groupEn: 'D', groupCn: 'D', },
    { short: 'DJ', name: '吉布提', en: 'Djibouti', code: '+253', groupEn: 'D', groupCn: 'J', },
    { short: 'DK', name: '丹麦', en: 'Denmark', code: '+45', groupEn: 'D', groupCn: 'D', },
    { short: 'DO', name: '多米尼加共和国', en: 'DominicaRep.', code: '+1890', groupEn: 'D', groupCn: 'D', },
    { short: 'DZ', name: '阿尔及利亚', en: 'Algeria', code: '+213', groupEn: 'D', groupCn: 'A', },
    { short: 'EC', name: '厄瓜多尔', en: 'Ecuador', code: '+593', groupEn: 'E', groupCn: 'E', },
    { short: 'EE', name: '爱沙尼亚', en: 'Estonia', code: '+372', groupEn: 'E', groupCn: 'A', },
    { short: 'EG', name: '埃及', en: 'Egypt', code: '+20', groupEn: 'E', groupCn: 'A', },
    { short: 'ES', name: '西班牙', en: 'Spain', code: '+34', groupEn: 'E', groupCn: 'X', },
    { short: 'ET', name: '埃塞俄比亚', en: 'Ethiopia', code: '+251', groupEn: 'E', groupCn: 'A', },
    { short: 'FI', name: '芬兰', en: 'Finland', code: '+358', groupEn: 'F', groupCn: 'F', },
    { short: 'FJ', name: '斐济', en: 'Fiji', code: '+679', groupEn: 'F', groupCn: 'F', },
    { short: 'FR', name: '法国', en: 'France', code: '+33', groupEn: 'F', groupCn: 'F', },
    { short: 'GA', name: '加蓬', en: 'Gabon', code: '+241', groupEn: 'G', groupCn: 'J', },
    { short: 'GB', name: '英国', en: 'UnitedKiongdom', code: '+44', groupEn: 'G', groupCn: 'Y', },
    { short: 'GD', name: '格林纳达', en: 'Grenada', code: '+1809', groupEn: 'G', groupCn: 'G', },
    { short: 'GE', name: '格鲁吉亚', en: 'Georgia', code: '+995', groupEn: 'G', groupCn: 'G', },
    { short: 'GF', name: '法属圭亚那', en: 'FrenchGuiana', code: '+594', groupEn: 'G', groupCn: 'F', },
    { short: 'GH', name: '加纳', en: 'Ghana', code: '+233', groupEn: 'G', groupCn: 'J', },
    { short: 'GI', name: '直布罗陀', en: 'Gibraltar', code: '+350', groupEn: 'G', groupCn: 'Z', },
    { short: 'GM', name: '冈比亚', en: 'Gambia', code: '+220', groupEn: 'G', groupCn: 'G', },
    { short: 'GN', name: '几内亚', en: 'Guinea', code: '+224', groupEn: 'G', groupCn: 'J', },
    { short: 'GR', name: '希腊', en: 'Greece', code: '+30', groupEn: 'G', groupCn: 'X', },
    { short: 'GT', name: '危地马拉', en: 'Guatemala', code: '+502', groupEn: 'G', groupCn: 'W', },
    { short: 'GU', name: '关岛', en: 'Guam', code: '+1671', groupEn: 'G', groupCn: 'G', },
    { short: 'GY', name: '圭亚那', en: 'Guyana', code: '+592', groupEn: 'G', groupCn: 'G', },
    { short: 'HK', name: '中国香港', en: 'Hongkong', code: '+852', groupEn: 'H', groupCn: 'Z', },
    { short: 'HN', name: '洪都拉斯', en: 'Honduras', code: '+504', groupEn: 'H', groupCn: 'H', },
    { short: 'HT', name: '海地', en: 'Haiti', code: '+509', groupEn: 'H', groupCn: 'H', },
    { short: 'HU', name: '匈牙利', en: 'Hungary', code: '+36', groupEn: 'H', groupCn: 'X', },
    { short: 'ID', name: '印度尼西亚', en: 'Indonesia', code: '+62', groupEn: 'I', groupCn: 'Y', },
    { short: 'IE', name: '爱尔兰', en: 'Ireland', code: '+353', groupEn: 'I', groupCn: 'A', },
    { short: 'IL', name: '以色列', en: 'Israel', code: '+972', groupEn: 'I', groupCn: 'Y', },
    { short: 'IN', name: '印度', en: 'India', code: '+91', groupEn: 'I', groupCn: 'Y', },
    { short: 'IQ', name: '伊拉克', en: 'Iraq', code: '+964', groupEn: 'I', groupCn: 'Y', },
    { short: 'IR', name: '伊朗', en: 'Iran', code: '+98', groupEn: 'I', groupCn: 'Y', },
    { short: 'IS', name: '冰岛', en: 'Iceland', code: '+354', groupEn: 'I', groupCn: 'B', },
    { short: 'IT', name: '意大利', en: 'Italy', code: '+39', groupEn: 'I', groupCn: 'Y', },
    { short: '', name: '科特迪瓦', en: 'IvoryCoast', code: '+225', groupEn: 'I', groupCn: 'K', },
    { short: 'JM', name: '牙买加', en: 'Jamaica', code: '+1876', groupEn: 'J', groupCn: 'Y', },
    { short: 'JO', name: '约旦', en: 'Jordan', code: '+962', groupEn: 'J', groupCn: 'Y', },
    { short: 'JP', name: '日本', en: 'Japan', code: '+81', groupEn: 'J', groupCn: 'R', },
    { short: 'KE', name: '肯尼亚', en: 'Kenya', code: '+254', groupEn: 'K', groupCn: 'K', },
    { short: 'KG', name: '吉尔吉斯坦', en: 'Kyrgyzstan', code: '+331', groupEn: 'K', groupCn: 'J', },
    { short: 'KH', name: '柬埔寨', en: 'Kampuchea(Cambodia)', code: '+855', groupEn: 'K', groupCn: 'J', },
    { short: 'KP', name: '朝鲜', en: 'NorthKorea', code: '+850', groupEn: 'K', groupCn: 'C', },
    { short: 'KR', name: '韩国', en: 'Korea', code: '+82', groupEn: 'K', groupCn: 'H', },
    { short: 'KT', name: '科特迪瓦共和国', en: 'RepublicofIvoryCoast', code: '+225', groupEn: 'K', groupCn: 'K', },
    { short: 'KW', name: '科威特', en: 'Kuwait', code: '+965', groupEn: 'K', groupCn: 'K', },
    { short: 'KZ', name: '哈萨克斯坦', en: 'Kazakstan', code: '+327', groupEn: 'K', groupCn: 'H', },
    { short: 'LA', name: '老挝', en: 'Laos', code: '+856', groupEn: 'L', groupCn: 'L', },
    { short: 'LB', name: '黎巴嫩', en: 'Lebanon', code: '+961', groupEn: 'L', groupCn: 'L', },
    { short: 'LC', name: '圣卢西亚', en: 'St.Lucia', code: '+1758', groupEn: 'L', groupCn: 'S', },
    { short: 'LI', name: '列支敦士登', en: 'Liechtenstein', code: '+423', groupEn: 'L', groupCn: 'L', },
    { short: 'LK', name: '斯里兰卡', en: 'SriLanka', code: '+94', groupEn: 'L', groupCn: 'S', },
    { short: 'LR', name: '利比里亚', en: 'Liberia', code: '+231', groupEn: 'L', groupCn: 'L', },
    { short: 'LS', name: '莱索托', en: 'Lesotho', code: '+266', groupEn: 'L', groupCn: 'L', },
    { short: 'LT', name: '立陶宛', en: 'Lithuania', code: '+370', groupEn: 'L', groupCn: 'L', },
    { short: 'LU', name: '卢森堡', en: 'Luxembourg', code: '+352', groupEn: 'L', groupCn: 'L', },
    { short: 'LV', name: '拉脱维亚', en: 'Latvia', code: '+371', groupEn: 'L', groupCn: 'L', },
    { short: 'LY', name: '利比亚', en: 'Libya', code: '+218', groupEn: 'L', groupCn: 'L', },
    { short: 'MA', name: '摩洛哥', en: 'Morocco', code: '+212', groupEn: 'M', groupCn: 'M', },
    { short: 'MC', name: '摩纳哥', en: 'Monaco', code: '+377', groupEn: 'M', groupCn: 'M', },
    { short: 'MD', name: '摩尔多瓦', en: 'Moldova,Republicof', code: '+373', groupEn: 'M', groupCn: 'M', },
    { short: 'MG', name: '马达加斯加', en: 'Madagascar', code: '+261', groupEn: 'M', groupCn: 'M', },
    { short: 'ML', name: '马里', en: 'Mali', code: '+223', groupEn: 'M', groupCn: 'M', },
    { short: 'MM', name: '缅甸', en: 'Burma', code: '+95', groupEn: 'M', groupCn: 'M', },
    { short: 'MN', name: '蒙古', en: 'Mongolia', code: '+976', groupEn: 'M', groupCn: 'M', },
    { short: 'MO', name: '中国澳门', en: 'Macao', code: '+853', groupEn: 'M', groupCn: 'Z', },
    { short: 'MS', name: '蒙特塞拉特岛', en: 'MontserratIs', code: '+1664', groupEn: 'M', groupCn: 'M', },
    { short: 'MT', name: '马耳他', en: 'Malta', code: '+356', groupEn: 'M', groupCn: 'M', },
    { short: '', name: '马里亚那群岛', en: 'MarianaIs', code: '+1670', groupEn: 'M', groupCn: 'M', },
    { short: '', name: '马提尼克', en: 'Martinique', code: '+596', groupEn: 'M', groupCn: 'M', },
    { short: 'MU', name: '毛里求斯', en: 'Mauritius', code: '+230', groupEn: 'M', groupCn: 'M', },
    { short: 'MV', name: '马尔代夫', en: 'Maldives', code: '+960', groupEn: 'M', groupCn: 'M', },
    { short: 'MW', name: '马拉维', en: 'Malawi', code: '+265', groupEn: 'M', groupCn: 'M', },
    { short: 'MX', name: '墨西哥', en: 'Mexico', code: '+52', groupEn: 'M', groupCn: 'M', },
    { short: 'MY', name: '马来西亚', en: 'Malaysia', code: '+60', groupEn: 'M', groupCn: 'M', },
    { short: 'MZ', name: '莫桑比克', en: 'Mozambique', code: '+258', groupEn: 'M', groupCn: 'M', },
    { short: 'NA', name: '纳米比亚', en: 'Namibia', code: '+264', groupEn: 'N', groupCn: 'N', },
    { short: 'NE', name: '尼日尔', en: 'Niger', code: '+977', groupEn: 'N', groupCn: 'N', },
    { short: 'NG', name: '尼日利亚', en: 'Nigeria', code: '+234', groupEn: 'N', groupCn: 'N', },
    { short: 'NI', name: '尼加拉瓜', en: 'Nicaragua', code: '+505', groupEn: 'N', groupCn: 'N', },
    { short: 'NL', name: '荷兰', en: 'Netherlands', code: '+31', groupEn: 'N', groupCn: 'H', },
    { short: 'NO', name: '挪威', en: 'Norway', code: '+47', groupEn: 'N', groupCn: 'N', },
    { short: 'NP', name: '尼泊尔', en: 'Nepal', code: '+977', groupEn: 'N', groupCn: 'N', },
    { short: '', name: '荷属安的列斯', en: 'NetheriandsAntilles', code: '+599', groupEn: 'N', groupCn: 'H', },
    { short: 'NR', name: '瑙鲁', en: 'Nauru', code: '+674', groupEn: 'N', groupCn: 'N', },
    { short: 'NZ', name: '新西兰', en: 'NewZealand', code: '+64', groupEn: 'N', groupCn: 'X', },
    { short: 'OM', name: '阿曼', en: 'Oman', code: '+968', groupEn: 'O', groupCn: 'A', },
    { short: 'PA', name: '巴拿马', en: 'Panama', code: '+507', groupEn: 'P', groupCn: 'B', },
    { short: 'PE', name: '秘鲁', en: 'Peru', code: '+51', groupEn: 'P', groupCn: 'B', },
    { short: 'PF', name: '法属玻利尼西亚', en: 'FrenchPolynesia', code: '+689', groupEn: 'P', groupCn: 'F', },
    { short: 'PG', name: '巴布亚新几内亚', en: 'PapuaNewCuinea', code: '+675', groupEn: 'P', groupCn: 'B', },
    { short: 'PH', name: '菲律宾', en: 'Philippines', code: '+63', groupEn: 'P', groupCn: 'F', },
    { short: 'PK', name: '巴基斯坦', en: 'Pakistan', code: '+92', groupEn: 'P', groupCn: 'B', },
    { short: 'PL', name: '波兰', en: 'Poland', code: '+48', groupEn: 'P', groupCn: 'B', },
    { short: 'PR', name: '波多黎各', en: 'PuertoRico', code: '+1787', groupEn: 'P', groupCn: 'B', },
    { short: 'PT', name: '葡萄牙', en: 'Portugal', code: '+351', groupEn: 'P', groupCn: 'P', },
    { short: 'PY', name: '巴拉圭', en: 'Paraguay', code: '+595', groupEn: 'P', groupCn: 'B', },
    { short: 'QA', name: '卡塔尔', en: 'Qatar', code: '+974', groupEn: 'Q', groupCn: 'K', },
    { short: '', name: '留尼旺', en: 'Reunion', code: '+262', groupEn: 'R', groupCn: 'L', },
    { short: 'RO', name: '罗马尼亚', en: 'Romania', code: '+40', groupEn: 'R', groupCn: 'L', },
    { short: 'RU', name: '俄罗斯', en: 'Russia', code: '+7', groupEn: 'R', groupCn: 'E', },
    { short: 'SA', name: '沙特阿拉伯', en: 'SaudiArabia', code: '+966', groupEn: 'S', groupCn: 'S', },
    { short: 'SB', name: '所罗门群岛', en: 'SolomonIs', code: '+677', groupEn: 'S', groupCn: 'S', },
    { short: 'SC', name: '塞舌尔', en: 'Seychelles', code: '+248', groupEn: 'S', groupCn: 'S', },
    { short: 'SD', name: '苏丹', en: 'Sudan', code: '+249', groupEn: 'S', groupCn: 'S', },
    { short: 'SE', name: '瑞典', en: 'Sweden', code: '+46', groupEn: 'S', groupCn: 'R', },
    { short: 'SG', name: '新加坡', en: 'Singapore', code: '+65', groupEn: 'S', groupCn: 'X', },
    { short: 'SI', name: '斯洛文尼亚', en: 'Slovenia', code: '+386', groupEn: 'S', groupCn: 'S', },
    { short: 'SK', name: '斯洛伐克', en: 'Slovakia', code: '+421', groupEn: 'S', groupCn: 'S', },
    { short: 'SL', name: '塞拉利昂', en: 'SierraLeone', code: '+232', groupEn: 'S', groupCn: 'S', },
    { short: 'SM', name: '圣马力诺', en: 'SanMarino', code: '+378', groupEn: 'S', groupCn: 'S', },
    { short: '', name: '东萨摩亚(美)', en: 'SamoaEastern', code: '+684', groupEn: 'S', groupCn: 'D', },
    { short: '', name: '西萨摩亚', en: 'SanMarino', code: '+685', groupEn: 'S', groupCn: 'X', },
    { short: 'SN', name: '塞内加尔', en: 'Senegal', code: '+221', groupEn: 'S', groupCn: 'S', },
    { short: 'SO', name: '索马里', en: 'Somali', code: '+252', groupEn: 'S', groupCn: 'S', },
    { short: 'SR', name: '苏里南', en: 'Suriname', code: '+597', groupEn: 'S', groupCn: 'S', },
    { short: 'ST', name: '圣多美和普林西比', en: 'SaoTomeandPrincipe', code: '+239', groupEn: 'S', groupCn: 'S', },
    { short: 'SV', name: '萨尔瓦多', en: 'EISalvador', code: '+503', groupEn: 'S', groupCn: 'S', },
    { short: 'SY', name: '叙利亚', en: 'Syria', code: '+963', groupEn: 'S', groupCn: 'X', },
    { short: 'SZ', name: '斯威士兰', en: 'Swaziland', code: '+268', groupEn: 'S', groupCn: 'S', },
    { short: 'TD', name: '乍得', en: 'Chad', code: '+235', groupEn: 'T', groupCn: 'Z', },
    { short: 'TG', name: '多哥', en: 'Togo', code: '+228', groupEn: 'T', groupCn: 'D', },
    { short: 'TH', name: '泰国', en: 'Thailand', code: '+66', groupEn: 'T', groupCn: 'T', },
    { short: 'TJ', name: '塔吉克斯坦', en: 'Tajikstan', code: '+992', groupEn: 'T', groupCn: 'T', },
    { short: 'TM', name: '土库曼斯坦', en: 'Turkmenistan', code: '+993', groupEn: 'T', groupCn: 'T', },
    { short: 'TN', name: '突尼斯', en: 'Tunisia', code: '+216', groupEn: 'T', groupCn: 'T', },
    { short: 'TO', name: '汤加', en: 'Tonga', code: '+676', groupEn: 'T', groupCn: 'T', },
    { short: 'TR', name: '土耳其', en: 'Turkey', code: '+90', groupEn: 'T', groupCn: 'T', },
    { short: 'TT', name: '特立尼达和多巴哥', en: 'TrinidadandTobago', code: '+1809', groupEn: 'T', groupCn: 'T', },
    { short: 'TW', name: '中国台湾', en: 'Taiwan', code: '+886', groupEn: 'T', groupCn: 'Z', },
    { short: 'TZ', name: '坦桑尼亚', en: 'Tanzania', code: '+255', groupEn: 'T', groupCn: 'T', },
    { short: 'UA', name: '乌克兰', en: 'Ukraine', code: '+380', groupEn: 'U', groupCn: 'W', },
    { short: 'UG', name: '乌干达', en: 'Uganda', code: '+256', groupEn: 'U', groupCn: 'W', },
    { short: 'US', name: '美国', en: 'UnitedStatesofAmerica', code: '+1', groupEn: 'U', groupCn: 'M', },
    { short: 'UY', name: '乌拉圭', en: 'Uruguay', code: '+598', groupEn: 'U', groupCn: 'W', },
    { short: 'UZ', name: '乌兹别克斯坦', en: 'Uzbekistan', code: '+233', groupEn: 'U', groupCn: 'W', },
    { short: 'VC', name: '圣文森特岛', en: 'SaintVincent', code: '+1784', groupEn: 'V', groupCn: 'S', },
    { short: 'VE', name: '委内瑞拉', en: 'Venezuela', code: '+58', groupEn: 'V', groupCn: 'W', },
    { short: 'VN', name: '越南', en: 'Vietnam', code: '+84', groupEn: 'V', groupCn: 'Y', },
    { short: 'YE', name: '也门', en: 'Yemen', code: '+967', groupEn: 'Y', groupCn: 'Y', },
    { short: 'YU', name: '南斯拉夫', en: 'Yugoslavia', code: '+381', groupEn: 'Y', groupCn: 'N', },
    { short: 'ZA', name: '南非', en: 'SouthAfrica', code: '+27', groupEn: 'Z', groupCn: 'N', },
    { short: 'ZM', name: '赞比亚', en: 'Zambia', code: '+260', groupEn: 'Z', groupCn: 'Z', },
    { short: 'ZR', name: '扎伊尔', en: 'Zaire', code: '+243', groupEn: 'Z', groupCn: 'Z', },
    { short: 'ZW', name: '津巴布韦', en: 'Zimbabwe', code: '+263', groupEn: 'Z', groupCn: 'J', },
]
const recommend = [
    { short: 'CN', name: '中国', en: 'China', code: '+86', groupEn: 'C', groupCn: 'Z', },
    { short: 'HK', name: '中国香港', en: 'Hongkong', code: '+852', groupEn: 'H', groupCn: 'X', },
    { short: 'TW', name: '中国台湾', en: 'Taiwan', code: '+886', groupEn: 'T', groupCn: 'T', },
    { short: 'TW', name: '中国澳门', en: 'Macao', code: '+853', groupEn: 'M', groupCn: 'A', },
    { short: 'MY', name: '马来西亚', en: 'Malaysia', code: '+60', groupEn: 'M', groupCn: 'M', },
    { short: 'JP', name: '日本', en: 'Japan', code: '+81', groupEn: 'J', groupCn: 'R', },
    { short: 'US', name: '美国', en: 'UnitedStatesofAmerica', code: '+1', groupEn: 'U', groupCn: 'M' },
]
//返回处理好的数据
export function countryCode() {
    const options = { group: 'cn' }
    const data = groupData(options.group)
    data.unshift({
        key: '推荐登录地区',
        value: recommend.slice(),
    })
    return data;
}
const groupData = function (flag) {
    let map = {
        cn: 'groupCn',
        en: 'groupEn',
    }
    let groupKey = map[flag]
    if (!groupKey) {
        return rawData.slice()
    }
    let result = []
    for (let i = 0; i < rawData.length; i++) {
        let item = rawData[i]
        let savedOne = findData(result, function (i) {
            return i.key === item[groupKey]
        })
        if (savedOne) {
            savedOne.value.push(item)
        } else {
            result.push({
                key: item[groupKey],
                value: [item],
            })
        }
    }
    return sortData(result)
}
const sortData = function (list) {
    return list.sort(function (a, b) {
        return a.key > b.key ? 1 : -1
    })
}
const findData = function (list, predicator) {
    for (let i = 0; i < list.length; i++) {
        let item = list[i]
        if (predicator(item, i, list)) {
            return item
        }
    }
    return null
}
//搜索功能
export function queryData(word) {
    word = String(word || '')
    word = word.toLowerCase()
    return queryGroup(word)
}
const filterData = function (item, word) {
    return (
        item.short.toLowerCase().indexOf(word) >= 0 || item.en.toLowerCase().indexOf(word) >= 0 || item.name.indexOf(word) >= 0 || item.code.indexOf(word) >= 0
    )
}
const queryGroup = function (word) {
    let arr = []
    const data = countryCode()
    for (let index = 0; index < data.length; index++) {
        let item = data[index]
        let value = item.value.filter(function (i) {
            return filterData(i, word)
        })
        if (value.length > 0) {
            arr.push({
                key: item.key,
                value: value,
            })
        }
    }
    return arr
}

