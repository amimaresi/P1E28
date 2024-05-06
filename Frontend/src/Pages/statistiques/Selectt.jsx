import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
  import { useState } from 'react';
const Selectt = () =>{
    const [selectedOption, setSelectedOption] = useState('');

  const handleButtonClick = () => {
    console.log("Selected option:", selectedOption);
   
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return(
    <Select onChange={handleSelectChange}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Theme" />
    </SelectTrigger>
    <SelectContent>
      <h3 className="font-bold">nombre de :</h3>
      <SelectItem value="publication">
        publications
      </SelectItem>
      <SelectItem value="encadrement">
        encadrements
      </SelectItem>
      <SelectItem value="projet">projets</SelectItem>
      <h3 className="font-bold"> type encadrement:</h3>
      <SelectItem value="pfe">PFE</SelectItem>
      <SelectItem value="master">Master2</SelectItem>
      <SelectItem value="doctorat">Doctorat</SelectItem>
    </SelectContent>
  </Select>
  )
}
export default Selectt;