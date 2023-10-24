import { supabase } from "../screens/0AUTH/supabase";

import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';

const CreateTableButton = () => {
  const [currentListenColumn, setCurrentListenColumn] = useState(null);
  const [nextListenColumn, setNextListenColumn] = useState(null);

  const getListenColumns = async () => {
    const { data, error } = await supabase.rpc('get_columns', {
      tname: 'history',
    });

    if (error) {
      console.error('Error fetching column names:', error);
      return [];
    } else {
      const columnNames = data.map((item) => item.column_name);
      return columnNames;
    }
  };

  const getLastListenColumn = async () => {
    const columns = await getListenColumns();
    if (columns.length > 0) {
      return columns[columns.length - 1];
    } else {
      return null;
    }
  };

  useEffect(() => {
    getLastListenColumn().then((lastColumn) => {
      if (lastColumn) {
        setCurrentListenColumn(lastColumn);
        // Generate the name of the next column (e.g., listen2024)
        const nextColumn = `listen${parseInt(lastColumn.replace('listen', '')) + 1}`;
        setNextListenColumn(nextColumn);
      }
    });
  }, []);

  const createNewListenColumn = async () => {
    if (nextListenColumn) {
      const { error } = await supabase.rpc('create_column', {
        tname: 'history',
        column_name: nextListenColumn,
        data_type: 'date',
      });
      if (error) {
        console.error(`Error creating column ${nextListenColumn}:`, error);
      } else {
        console.log(`Column ${nextListenColumn} created successfully`);
      }
    }
  };

  return (
    <View>
      {currentListenColumn && (
        <Button
          title={`Create ${nextListenColumn} column`}
          onPress={createNewListenColumn}
        />
      )}
    </View>
  );
};

export default CreateTableButton;

