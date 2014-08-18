/* ========================================================================
 * Copyright 2014 olorcito
 *
 * Licensed under the MIT, The MIT License (MIT)
 * Copyright (c) 2014 olorcito

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 * ========================================================================


Source generated by CrudMaker version 1.0.0.201408112050

*/

package co.edu.uniandes.csw.olorcito.prize.persistence.converter;

import java.util.ArrayList;
import java.util.List;
import java.text.SimpleDateFormat;
import java.text.ParseException;
import java.util.logging.Level;
import java.util.logging.Logger;


import co.edu.uniandes.csw.olorcito.prize.logic.dto.PrizeDTO;
import co.edu.uniandes.csw.olorcito.prize.persistence.entity.PrizeEntity;

public abstract class _PrizeConverter {

	public static PrizeDTO entity2PersistenceDTO(PrizeEntity entity){
		if (entity != null) {
			PrizeDTO dto = new PrizeDTO();
					dto.setId(entity.getId());
					dto.setName(entity.getName());
			return dto;
		}else{
			return null;
		}
	}
	
	public static PrizeEntity persistenceDTO2Entity(PrizeDTO dto){
		if(dto!=null){
			PrizeEntity entity=new PrizeEntity();
					entity.setId(dto.getId());
			
					entity.setName(dto.getName());
			
			return entity;
		}else {
			return null;
		}
	}
	
	public static List<PrizeDTO> entity2PersistenceDTOList(List<PrizeEntity> entities){
		List<PrizeDTO> dtos=new ArrayList<PrizeDTO>();
		for(PrizeEntity entity:entities){
			dtos.add(entity2PersistenceDTO(entity));
		}
		return dtos;
	}
	
	public static List<PrizeEntity> persistenceDTO2EntityList(List<PrizeDTO> dtos){
		List<PrizeEntity> entities=new ArrayList<PrizeEntity>();
		for(PrizeDTO dto:dtos){
			entities.add(persistenceDTO2Entity(dto));
		}
		return entities;
	}
}