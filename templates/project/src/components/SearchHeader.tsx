import { SearchOutlined, Input } from "@zcmjs/ui"

const SearchHeader = () => {
    return <Input
        addonBefore={<SearchOutlined />}
        placeholder="Tìm kiếm"
        size="large"
        style={{ width: '40%' }} />
}

export default SearchHeader;