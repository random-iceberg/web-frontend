import React, { useEffect, useState } from "react";
import { ModelProvider } from "components/context/ModelContext";
import ModelList from "components/models/ModelList";
import TrainModelForm from "components/models/TrainModelForm";
import Card from "components/common/Card";
import Layout from "components/Layout";
import PageHeader from "components/common/PageHeader";

const AdminConsole: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <ModelProvider>
      <Layout>
        <div data-testid="admin-console">
        <PageHeader
          title="Admin Console"
          description="Manage prediction models: train new models or remove existing ones."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="p-8 col-span-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Train New Model
            </h2>
            <TrainModelForm />
          </Card>
          <Card className="p-8 col-span-1 lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Available Models
            </h2>
            <ModelList />
          </Card>
        </div>
        </div>
      </Layout>
    </ModelProvider>
  );
};

export default AdminConsole;
