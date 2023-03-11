import { IComponent } from "./component";
import { Entity } from "./entity";

class E extends Entity {}
class C1 implements IComponent {
  awake(): void {
    throw new Error("Method not implemented.");
  }
  update(deltaTime: number): void {
    throw new Error("Method not implemented.");
  }
  public entity: E | null;
}
class C2 implements IComponent {
  awake(): void {
    throw new Error("Method not implemented.");
  }
  update(deltaTime: number): void {
    throw new Error("Method not implemented.");
  }
  public entity: E | null;
}
class C3 implements IComponent {
  awake(): void {
    throw new Error("Method not implemented.");
  }
  update(deltaTime: number): void {
    throw new Error("Method not implemented.");
  }
  public entity: E | null;
}

describe('>>> Entity', () => {
  let e: E;
  const c1 = new C1();
  const c2 = new C2();
  const c3 = new C3();

  beforeEach(() => {
    e = new E();
  });

  it('should add, remove, get and check components', () => {
  });
});
