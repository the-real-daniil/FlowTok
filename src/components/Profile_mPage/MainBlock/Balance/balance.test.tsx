import Balance, {PropsType} from "./Balance";
import {configureEnzyme, findByTestAttr, setUp} from "../../../../utils/forTests";
import {ShallowWrapper} from "enzyme";

configureEnzyme()

describe("History Component", () => {
   const props = {

   } as PropsType
   let component: ShallowWrapper;
   beforeEach(() => {
      component = setUp<PropsType>(Balance, props)
   })

   it ("should be render without error", () => {
      const column = findByTestAttr(component, "wrapper")
      expect(column.length).toBe(1)
   })
})
