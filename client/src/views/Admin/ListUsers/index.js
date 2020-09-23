import React, { useEffect, useState } from "react";
import GridContainer from "components/Admin/Grid/GridContainer";
import GridItem from "components/Admin/Grid/GridItem";
import Card from "components/Admin/Card/Card";
import CardHeader from "components/Admin/Card/CardHeader";
import CardBody from "components/Admin/Card/CardBody";
import ShynnTable from "components/Admin/Table/ShynnTable";
import Api from "Api";

export const ListUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await Api.get("/auth/users");
        if (res.data) {
          setUsers(res.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllUsers();
  }, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
      },
      {
        Header: "Display Name",
        accessor: "displayName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
    ],
    []
  );
  return (
    <GridContainer>
      <GridItem xs={12}>
        <Card>
          <CardHeader color="primary">
            <h4>Simple Table</h4>
            <p>Here is a subtitle for this table</p>
          </CardHeader>
          <CardBody>
            <ShynnTable
              data={users}
              columns={columns}
              className="-striped -highlight"
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};
