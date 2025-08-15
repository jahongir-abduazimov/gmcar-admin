import { ConfigProvider, Space, Table } from "antd";
import DeleteModel from "./DeleteModel";
import EditGeneration from "./EditGeneration";

const GenerationsTable = ({ data, isLoading, onDeleteCallback }) => {
  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => `${index + 1}.`,
      width: "5%",
      align: "center",
    },
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
      render: (name, record) => name,
      width: "25%",
    },
    {
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* <Button
            onClick={() => navigate(`/category/${record.id}`)}
            type="text"
            size="large"
            icon={<EnterOutlined style={{ fontSize: 20 }} />}
          />
          <Button
            type="text"
            size="large"
            icon={<EditOutlined style={{ fontSize: 20 }} />}
            onClick={() => {
              setIsOpen(true);
              setEditData(record);
            }}
          /> */}
          <EditGeneration data={record} onEditCallback={onDeleteCallback} />
          <DeleteModel id={record.id} onDeleteCallback={onDeleteCallback} />
        </Space>
      ),
    },
  ];
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            fontSize: 16,
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          loading={isLoading}
        />
      </ConfigProvider>
    </>
  );
};

export default GenerationsTable;
