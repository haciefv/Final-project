// import { Flex } from '@chakra-ui/layout';
// import { Icon,Text } from '@chakra-ui/react';
// import React from 'react';
// import {TabItems}from "./NewPostForm";

// type TabItemsProps = {
//     item:TabItems;
//     selected:boolean
//     setSelectedTab: (value: string) => void;

// };

// const TabItems:React.FC<TabItemsProps> = ({item,selected,setSelectedTab}) => {
    
//     return (
//         <Flex
//         justify="center"
//         align="center"
//         flexGrow={1}
//         p="14px 0px"
//         cursor="pointer"
//         fontWeight={700}
//         color={selected ? "blue.500" : "gray.500"}
//         borderWidth={selected ? "0px 1px 2px 0px" : "0px 1px 1px 0px"}
//         borderBottomColor={selected ? "blue.500" : "gray.200"}
//         borderRightColor="gray.200"
//         _hover={{ bg: "gray.50" }}
//         onClick={() => setSelectedTab(item.title)}
//       >
//         <Flex align="center" height="20px" mr={2}>
//           <Icon height="100%" as={item.icon} fontSize={18} />
//         </Flex>
//         <Text fontSize="10pt">{item.title}</Text>
//       </Flex>
//     )
// }
// export default TabItems;
import React from 'react';

type TabItemsProps = {
  
};

const TabItems:React.FC<TabItemsProps> = () => {
  
  return <div>Have a good coding</div>
}
export default TabItems;